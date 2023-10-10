Projer Asp.Net Core 7.0 ile hazırlanmıştır.
2 adet uygulamadan oluşmaktadır. Web Api ve Web Application(UI)
Tüm bussiness işlemleri(iç servisler, dış servisler vs) Api uygulaması vasıtasıyla gerçekleşmektedir.
Ön yüz teknolojisi için MVC teknolojisi kullanılmıştır.
Db teknolojisi olarak Postgres db seçilmiştir.
Onion architecture mimarisi:
  Domain -> Application -> Infrastructure(dış servisler) -> Web Api
  Domain -> Application -> Persistence(iç servisler) -> Web Api
Docker container üzerinde ayağa kalkacak şekilde tüm ayarlamalar yapılmıştır. Docker compose edildiğinde db otomatik olarak oluşturulmaktadır. Projeyi ilk kez ayağa kaldırıyorsanız, solution dosyasının içinde postgres dosyası varsa SİLİNİZ. Silinmezse db oluşturulmayacaktır. Proje ilk ayağa kaldırıldığında db'nin oluşturulması ve dummy dataların insert edilmesi için 1 dk gibi bir sürenin beklenmesi gerekmektedir. Bekleme gerçekleşmeden işlem yapılmaya çalışılırsa proje hata verecektir. Docker db init sayesinde herhangi bir db restore işlemi gerekmemektedir.
Bitcoin dummy data eklenme tarihleri 30.09.2023-01.10.2023 tarihleri arasındadır. Db oluştuktan sonra, Api, her dakikada bir, bitcoin datası insert etmeye başlayacaktır.
