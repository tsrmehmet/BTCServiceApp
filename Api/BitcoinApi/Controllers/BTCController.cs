using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BitcoinApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BTCController : ControllerBase
    {
        #region Fields

        private readonly IUnitOfWork _unitOfWork;

        #endregion

        #region Constructor

        public BTCController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        #endregion

        #region Methods

        #region List

        [HttpGet]
        public async Task<List<BitcoinModel>> List(DateTime? start, DateTime? end)
        {
            List<Bitcoin> bitcoins = await _unitOfWork.BitcoinRepository.GetBitcoinListByDateRangeAsync(start, end);
            List<BitcoinModel> model = new();
            for (int i = 0; i < bitcoins.Count; i++)
            {
                Bitcoin bitcoin = bitcoins[i];
                BitcoinModel bitcoinModel = new()
                {
                    Id = bitcoin.Id,
                    USD = bitcoin.USD,
                    Source = bitcoin.Source,
                    QueryDate = bitcoin.QueryDate,
                    CreatedDate = bitcoin.CreatedDate
                };
                model.Add(bitcoinModel);
            }
            return model;
        }

        #endregion

        #endregion
    }
}
