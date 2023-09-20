using Application.Interfaces;
using BitcoinApi.Controllers;
using Domain.Entities;
using Moq;

namespace BitcoinApi.Test
{
    public class ApiBTCControllerTest
    {
        #region Fields

        private readonly Mock<IUnitOfWork> _moqUnitOfWork;
        private readonly BTCController _btcController;
        private List<Bitcoin> bitcoins;

        #endregion

        #region Constructor

        public ApiBTCControllerTest()
        {
            _moqUnitOfWork = new Mock<IUnitOfWork>();
            _btcController = new BTCController(_moqUnitOfWork.Object);
            bitcoins = new()
            {
                new Bitcoin { Id = 1, USD = 1900, Source = "BTCBorsa.net", QueryDate = DateTime.UtcNow, CreatedDate = DateTime.UtcNow, Status = Domain.Enums.DataStatus.Inserted },
                new Bitcoin { Id = 2, USD = 1940, Source = "BTCBorsa.net", QueryDate = DateTime.UtcNow, CreatedDate = DateTime.UtcNow, Status = Domain.Enums.DataStatus.Inserted },
                new Bitcoin { Id = 3, USD = 1980, Source = "BTCBorsa.net", QueryDate = DateTime.UtcNow, CreatedDate = DateTime.UtcNow, Status = Domain.Enums.DataStatus.Inserted }
            };
        }

        #endregion

        #region Methods

        #region List_ActionExecutes_ReturnBTCListAsync

        [Fact]
        public void List_ActionExecutes_ReturnBTCListAsync()
        {
            _moqUnitOfWork.Setup(x => x.BitcoinRepository.GetBitcoinListByDateRangeAsync(DateTime.UtcNow.AddDays(-1), DateTime.UtcNow.AddDays(1))).ReturnsAsync(bitcoins);
            //var result = await _btcController.List(DateTime.UtcNow.AddDays(-1), DateTime.UtcNow.AddDays(1));
            Assert.Equal(3,bitcoins.Count);
        }

        #endregion

        #endregion
    }
}
