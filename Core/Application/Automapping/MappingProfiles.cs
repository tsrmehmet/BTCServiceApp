using Application.Models;
using AutoMapper;
using Domain.Entities;

namespace Application.Automapping
{
    public class MappingProfiles : Profile
    {
        #region Constructor

        public MappingProfiles()
        {
            #region Bitcoin

            CreateMap<Bitcoin, BitcoinModel>();

            CreateMap<BitcoinModel, Bitcoin>();

            #endregion

            #region User

            CreateMap<User, UserModel>()
                .ForMember(dest => dest.Password, o => o.Ignore())
                .ForMember(dest => dest.PasswordSalt, o => o.Ignore());

            CreateMap<UserModel, User>();

            #endregion
        }

        #endregion
    }
}
