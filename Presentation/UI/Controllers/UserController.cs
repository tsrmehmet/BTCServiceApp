using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Text;
using UI.Models;

namespace UI.Controllers
{
    public class UserController : Controller
    {
        #region Fields



        #endregion

        #region Constructor

        public UserController()
        {
        }

        #endregion

        #region Methods

        #region Login

        [AllowAnonymous]
        public IActionResult Login()
        {
            return View(new UserModel());
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(UserModel model)
        {
            using (HttpClient client = new())
            {
                string jsonModel = JsonConvert.SerializeObject(model);
                var content = new StringContent(jsonModel, Encoding.UTF8, "application/json");
                HttpResponseMessage result = await client.PostAsync("https://bitcoinapi/api/user/login", content);
                var request = await result.Content.ReadAsStringAsync();
                bool? response = JsonConvert.DeserializeObject<bool>(request);

                if (response == false)
                    return RedirectToAction("Login");
            }
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Email, model.Email)
            };
            ClaimsIdentity claimsIdentity = new(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            AuthenticationProperties authProperties = new()
            {
                AllowRefresh = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddDays(7),
                IsPersistent = model.RememberMe
            };
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);

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
            return View(new UserModel());
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create(UserModel model)
        {
            using (HttpClient client = new())
            {
                string jsonModel = JsonConvert.SerializeObject(model);
                var content = new StringContent(jsonModel, Encoding.UTF8, "application/json");
                HttpResponseMessage result = await client.PostAsync("https://bitcoinapi/api/user/create", content);
            }
            return RedirectToAction("Login");
        }

        #endregion

        #region Detail

        public async Task<IActionResult> Detail(int id)
        {
            using (HttpClient client = new())
            {
                HttpResponseMessage result = await client.GetAsync("https://bitcoinapi/api/user/detail");
                var response = await result.Content.ReadAsStringAsync();
                UserModel? user = JsonConvert.DeserializeObject<UserModel>(response);
                return View(user);
            }
        }

        #endregion

        #region Update

        [HttpPost]
        public async Task<IActionResult> Update(UserModel model)
        {
            using (HttpClient client = new())
            {
                string jsonModel = JsonConvert.SerializeObject(model);
                var content = new StringContent(jsonModel, Encoding.UTF8, "application/json");
                HttpResponseMessage result = await client.PostAsync("https://bitcoinapi/api/user/update", content);
            }
            return RedirectToAction("Info", "Btc");
        }

        #endregion

        #endregion
    }
}
