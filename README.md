# Сервис по поиску информации по бронированию отелей, автомобилей, билетов на самолеты и развлечения "Booking clone"

- Deploy: https://booking-clone-vladtarnovskiy.vercel.app/

## Используемые технологии

- **_npm/yarn_** - Менеджер пакетов.
- **_Angular_** - Framework для создания пользовательских интерфейсов.
- **_RxJs_** - Управление асинхронными операциями и событиями в приложении.
- **_NgRx_** - Для управления внутренним состоянием приложения.
- **_NgPrime_** - UI библиотека
- **_tailwind_** - CSS-фреймворк
- **TomTom** - карты

- **_Booking COM API_** - реальное api предоставляющее глобальный поиск информации по бронированию отелей, автомобилей, билетов на самолеты и развлечения.

## Дополнительный функционал

- Приложение развернуто на хостинге vercel
- Настроено CI/CD, используя [GitHub Actions](https://github.com/features/actions).
- Проект разрабатывался с помощью eslint, prettier, husky.

## Описание страниц

1. #### Landing

Страница описывает приложение и его возможности.

2. #### Cars

Страница по поиску информации по бронированию авто.

Поиск осуществляется по городу (elastic search, debounce), началу и концу даты и времени бронирования.

Результат содержит краткую информацию по бронированию авто.

При клике на авто осуществляется навигация на Сar Details.

Есть возможность просмотра найденных авто на карте, а так же возможность перехода страницу Сar Details.

На странице присутствует пагинация.

3. #### Car Details

Страница подробной информации по конкретному авто.

Присутствует подробная информация о дилере и авто.

Есть фото авто.

Есть отзывы пользователей.

4. #### Stays

Страница по поиску информации по бронированию отелей и домов.

Поиск осуществляется по городу (elastic search, debounce), началу и концу даты бронирования.

Результат содержит краткую информацию по бронированию отеля.

При клике на отель осуществляется навигация на Hotel Details.

Есть возможность просмотра найденных отелей на карте, а так же возможность перехода страницу Stay Details.

Есть возможность фильтрации отелей по количеству человек, количеству комнат, минимальной и максимальной цене.

Есть возможность сортировки отелей по популярности, расстоянию от центра города, рейтингу и цене.

На странице присутствует пагинация.

5. #### Stay Details

Страница подробной информации об отеле.

Присутствует подробная информация об отеле.

Есть фото номеров (слайдер).

Есть отзывы посетителей, а также их пагинация.

6. #### Attractions

Страница по поиску информации по бронированию билетов на посещение достопримечательностей и различных развлечений.

Поиск осуществляется по городу (elastic search, debounce).

Результат содержит краткую информацию по бронированию билета.

При клике на развлечение осуществляется навигация на Attraction Details.

Есть возможность сортировки развлечений по тренду, рейтингу и цене.

На странице присутствует пагинация.

7. #### Attraction Details

Страница подробной информации о развлечении.

Присутствует подробная информация о развлечении.

Есть развлечения (слайдер).

Есть отзывы посетителей.

8. #### Flights

Страница по поиску информации по бронированию билетов на самолеты.

Поиск осуществляется по городу отправления и прибытия (elastic search, debounce), а также дате отправления.

Результат содержит краткую информацию по бронированию билета на самолет.

При клике на билет осуществляется навигация на Flight Details.

Есть возможность фильтрации билетов по количеству мест и классу.

Есть возможность сортировки билетов быстроте полета и цене.

На странице присутствует пагинация.

9. #### Flight Details

Страница подробной информации о полете.

Присутствует подробная информация о полете и перевозчике.

10. #### Not Found page
