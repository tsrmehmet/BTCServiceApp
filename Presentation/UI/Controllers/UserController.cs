using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using UI.Models;

namespace UI.Controllers
{
    public class UserController : Controller
    {
        #region Utilities

        #region AuthenticationForApiCall

        private async Task AuthenticationForApiCall(UserLoginModel model)
        {
            HttpClientHandler httpClientHandler = new() { ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true };
            using HttpClient client = new(httpClientHandler);
            string jsonModel = JsonConvert.SerializeObject(model);
            StringContent content = new(jsonModel, Encoding.UTF8, "application/json");
            HttpResponseMessage result = await client.PostAsync("https://bitcoinapi/api/auth/authenticate", content);
            string request = await result.Content.ReadAsStringAsync();
            AuthResponse tokenResponse = JsonConvert.DeserializeObject<AuthResponse>(request);
            HttpContext.Session.SetString("JWTToken", tokenResponse.token);
        }

        #endregion

        #endregion

        #region Methods

        #region Login

        [AllowAnonymous]
        public IActionResult Login()
        {
            return View(new UserLoginModel());
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(UserLoginModel model)
        {
            if (!ModelState.IsValid)
            {
                var messages = ModelState.ToList();
                return View(model);
            }
            HttpClientHandler httpClientHandler = new() { ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true };
            using HttpClient client = new(httpClientHandler);
            string jsonModel = JsonConvert.SerializeObject(model);
            StringContent content = new(jsonModel, Encoding.UTF8, "application/json");
            HttpResponseMessage result = await client.PostAsync("https://bitcoinapi/api/user/login", content);
            string request = await result.Content.ReadAsStringAsync();
            bool response = JsonConvert.DeserializeObject<bool>(request);
            if (response == false)
                return RedirectToAction("Login");

            List<Claim> claims = new() { new Claim(ClaimTypes.Email, model.Email) };
            ClaimsIdentity claimsIdentity = new(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            AuthenticationProperties authProperties = new()
            {
                AllowRefresh = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddDays(7),
                IsPersistent = model.RememberMe
            };
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);

            await AuthenticationForApiCall(model);

            return RedirectToAction("Info", "Btc");
        }

        #endregion

        #region Logout

        public async Task<IActionResult> Logout()
        {
            //standard logout 
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login");
        }

        #endregion

        #region Create

        [AllowAnonymous]
        public IActionResult Create()
        {
            return View(new UserCreateModel());
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create(UserCreateModel model)
        {
            if (!ModelState.IsValid)
            {
                var messages = ModelState.ToList();
                return View(model);
            }
                
            HttpClientHandler httpClientHandler = new() { ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true };
            using HttpClient client = new(httpClientHandler);
            string jsonModel = JsonConvert.SerializeObject(model);
            StringContent content = new(jsonModel, Encoding.UTF8, "application/json");
            HttpResponseMessage result = await client.PostAsync("https://bitcoinapi/api/user/create", content);
            return RedirectToAction("Login");
        }

        #endregion

        #region Detail

        public async Task<IActionResult> Detail(UserDetailModel model)
        {
            if(model.Id != 0)
                return View(model);
            HttpClientHandler httpClientHandler = new() { ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true };
            using HttpClient client = new(httpClientHandler);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("JWTToken"));
            HttpResponseMessage result = await client.GetAsync("https://bitcoinapi/api/user/detail");
            string response = await result.Content.ReadAsStringAsync();
            UserDetailModel user = JsonConvert.DeserializeObject<UserDetailModel>(response);
            return View(user);
        }

        #endregion

        #region Update

        [HttpPost]
        public async Task<IActionResult> Update(UserDetailModel model)
        {
            if (!ModelState.IsValid)
            {
                var messages = ModelState.ToList();
                return RedirectToAction("Detail", model);
            }
            HttpClientHandler httpClientHandler = new() { ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true };
            using HttpClient client = new(httpClientHandler);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", HttpContext.Session.GetString("JWTToken"));
            string jsonModel = JsonConvert.SerializeObject(model);
            StringContent content = new(jsonModel, Encoding.UTF8, "application/json");
            HttpResponseMessage result = await client.PostAsync("https://bitcoinapi/api/user/update", content);
            return RedirectToAction("Info", "Btc");
        }

        #endregion

        #endregion
    }
}
