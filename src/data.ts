import { Movie } from './types';

export const movies: Movie[] = [
  {
    id: '2',
    title: { ru: 'Темный рыцарь', en: 'The Dark Knight', uz: 'Qora ritsar' },
    year: 2008,
    rating: 9.0,
    category: 'Action',
    description: {
      ru: 'Когда угроза, известная как Джокер, сеет хаос и беспорядок среди жителей Готэма, Бэтмен должен пройти одно из величайших психологических и физических испытаний своей способности бороться с несправедливостью.',
      en: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      uz: 'Joker nomi bilan tanilgan tahdid Gotem aholisi orasida tartibsizlik va vayronagarchiliklarni keltirib chiqarganda, Betmen adolatsizlikka qarshi kurashish qobiliyatining eng katta psixologik va jismoniy sinovlaridan birini qabul qilishi kerak.'
    },
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    backdropUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart']
  },
  {
    id: '1',
    title: { ru: 'Интерстеллар', en: 'Interstellar', uz: 'Interstellar' },
    year: 2014,
    rating: 8.7,
    category: 'Sci-Fi',
    description: {
      ru: 'Когда Земля становится непригодной для жизни, команда бывших пилотов и ученых отправляется на поиски нового дома для человечества, путешествуя через червоточину.',
      en: 'When Earth becomes uninhabitable, a team of ex-pilots and scientists is tasked with finding a new home for humanity by traveling through a wormhole.',
      uz: 'Yer yashash uchun yaroqsiz boʻlib qolganda, sobiq uchuvchilar va olimlar jamoasi qurt teshigi orqali sayohat qilib, insoniyat uchun yangi uy topish vazifasini bajaradilar.'
    },
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    backdropUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000',
    trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain']
  },
  {
    id: '3',
    title: { ru: 'Начало', en: 'Inception', uz: 'Muqaddima' },
    year: 2010,
    rating: 8.8,
    category: 'Sci-Fi',
    description: {
      ru: 'Вор, похищающий корпоративные секреты с помощью технологии совместного сновидения, получает обратную задачу: внедрить идею в сознание генерального директора.',
      en: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      uz: 'Birgalikda tush koʻrish texnologiyasi yordamida korporativ sirlarni oʻgʻirlaydigan oʻgʻri teskari vazifani oladi: bosh direktorning ongiga gʻoya kiritish.'
    },
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    backdropUrl: 'https://images.unsplash.com/photo-1492612638932-a11ce33d858a?auto=format&fit=crop&q=80&w=2000',
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page']
  },
  {
    id: '4',
    title: { ru: 'Отель «Гранд Будапешт»', en: 'The Grand Budapest Hotel', uz: 'Grand Budapesht mehmonxonasi' },
    year: 2014,
    rating: 8.1,
    category: 'Comedy',
    description: {
      ru: 'Писатель встречает владельца приходящего в упадок высококлассного отеля, который рассказывает ему о своих ранних годах службы в качестве коридорного в славные годы отеля под руководством исключительного консьержа.',
      en: 'A writer encounters the owner of a declining high-class hotel, who tells him of his early years serving as a lobby boy in the hotel\'s glorious years under an exceptional concierge.',
      uz: 'Yozuvchi tanazzulga yuz tutayotgan yuqori toifali mehmonxona egasini uchratadi, u unga mehmonxonaning shon-sharafli yillarida ajoyib konsyerj rahbarligida kuryer boʻlib xizmat qilgan dastlabki yillari haqida gapirib beradi.'
    },
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_.jpg',
    backdropUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2000',
    trailerUrl: 'https://www.youtube.com/embed/1Fg5iWmQjwk',
    cast: ['Ralph Fiennes', 'F. Murray Abraham', 'Mathieu Amalric']
  },
  {
    id: '5',
    title: { ru: 'Паразиты', en: 'Parasite', uz: 'Parazitlar' },
    year: 2019,
    rating: 8.5,
    category: 'Drama',
    description: {
      ru: 'Жадность и классовая дискриминация угрожают недавно сформировавшимся симбиотическим отношениям между богатой семьей Пак и обездоленным кланом Ким.',
      en: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
      uz: 'Ochkoʻzlik va tabaqaviy kamsitish boy Pak oilasi va kambagʻal Kim klani oʻrtasida yaqinda oʻrnatilgan simbiotik munosabatlarga tahdid solmoqda.'
    },
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    backdropUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=2000',
    trailerUrl: 'https://www.youtube.com/embed/5xH0HfJHsaY',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong']
  },
  {
    id: '7',
    title: { ru: 'Superперцы', en: 'Superbad', uz: 'Superbad' },
    year: 2007,
    rating: 7.6,
    category: 'Comedy',
    description: {
      ru: 'Двое зависимых друг от друга выпускников средней школы вынуждены справляться с тревогой разлуки после того, как их план устроить вечеринку с выпивкой проваливается.',
      en: 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-fueled party goes awry.',
      uz: 'Bir-biriga bogʻliq boʻlgan ikki oʻrta maktab bitiruvchisi spirtli ichimliklar bilan ziyofat uyushtirish rejasi barbod boʻlganidan keyin ajralish tashvishi bilan kurashishga majbur boʻlishadi.'
    },
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTc0NjIyNzE5NF5BMl5BanBnXkFtZTcwMzIxNDE1MQ@@._V1_.jpg',
    backdropUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000',
    trailerUrl: 'https://www.youtube.com/embed/4eaZ_ad8Te8',
    cast: ['Jonah Hill', 'Michael Cera', 'Christopher Mintz-Plasse']
  },
  {
    id: '8',
    title: { ru: 'Крестный отец', en: 'The Godfather', uz: 'Choʻqintirgan ota' },
    year: 1972,
    rating: 9.2,
    category: 'Drama',
    description: {
      ru: 'Стареющий патриарх организованной преступной династии передает контроль над своей тайной империей своему неохотному сыну.',
      en: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      uz: 'Uyushgan jinoyatchilik sulolasining keksaygan patriarxi oʻzining yashirin imperiyasi ustidan nazoratni oʻzining istaksiz oʻgʻliga topshiradi.'
    },
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwZC00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    backdropUrl: 'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?auto=format&fit=crop&q=80&w=2000',
    trailerUrl: 'https://www.youtube.com/embed/sY1S34973zA',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan']
  }
];
