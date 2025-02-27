# Проект Калькулятор: Frontend на React

Обращение к аpi идет через fetch, домены прописаны в файле src/app/types/global.ts


## При распаковке проекта надо выполнить две команды в терминале

```
npm install
```

```
npm run dev
```

Эта команда создаст новую версию проекта в папке dist. Эту папку надо загрузаить (обновить) на сервер. 
```
npm run build
```

Сам проект имеет три страницы:
 - калькулятор (но по сути это фильтр и вывод таблицы с продукцией). Тут всё завязано на переменной filter;
 - карточка товара (ссылка открывается, когда нажимаешь на артикул в результирующей таблице на странице калькулятора);
 - скачивание 3д моделей (вводится список артикулов, по ним приходит ответ, какие нельзя скачать и какие можно, ну и само скачивание).

Есть еще страница паспорт-мейкер, которая пока только как идея.



## По этому пути есть данные languageData
Они используются для создания опций на странице калькулятора и для сохранения-обновления url-search-params:
```
src/pages/calculator/config/languages.tsx
```
