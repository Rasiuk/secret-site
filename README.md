# Секретний сайт: як запустити

1. Встанови Node.js, у папці проєкту виконай: `npm install`
2. На supabase.com створи проєкт. SQL Editor -> встав вміст `supabase.sql` -> Run.
3. Authentication -> Users -> Add user: створи себе (пошта і пароль). Потім Authentication -> Sign In / Providers -> вимкни реєстрацію нових користувачів (Allow new users to sign up = off). Так в адмінку зможеш увійти лише ти.
4. Скопіюй `.env.example` у `.env` і встав URL та anon-ключ з Project Settings -> API.
5. У `src/components/Header.jsx` заміни посилання на свою банку Monobank.
6. `npm run dev`, відкрий адреси з консолі, зайди на /admin.

Структура:
- `src/pages/` сторінки (Home, Cartoon, Watch, Admin)
- `src/components/` маленькі блоки (Header, Hero, CartoonCard, VideoPlayer, UploadField)
- `src/supabase.js` підключення до бази й завантаження файлів

Відео: вставляй посилання YouTube, Bunny (play або embed) чи прямий mp4, або вибирай файл.
Безкоштовний Supabase приймає файли приблизно до 50 МБ, тож великі відео краще лити в Bunny і вставляти посилання.
