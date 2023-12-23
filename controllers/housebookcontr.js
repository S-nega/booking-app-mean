const express = require('express');
const router = express.Router();
const HouseBooking = require('../models/housebooking');
const House = require('../models/house');

// GET-маршрут для просмотра аренды дома по ID
router.get('/', async (req, res) => {
    try {
        const booking = await HouseBooking.find({});

        // Проверяем, было ли найдены бронирования
        if (!booking) {
            return res.status(404).json({ message: 'Бронирования не найдены' });
        }

        // Возвращаем найденное бронирование в ответе
        res.status(200).json({ booking });
    } catch (error) {
        console.error('Ошибка при просмотре аренд:', error);
        res.status(500).json({ message: 'Произошла ошибка при просмотре аренд' });
    }
});


// POST-маршрут для аренды дома
router.post('/', async (req, res) => {
    try {
        // Получаем данные из тела запроса
        const { houseId, startDate, endDate } = req.body;

        // Проверяем, что все обязательные поля переданы
        if (!houseId || !startDate || !endDate) {
            return res.status(400).json({ message: 'Не все обязательные поля заполнены' });
        }


        // Находим дом по ID
        const house = await House.findById(houseId);


        // Проверяем, был ли найден дом
        if (!house) {
            return res.status(404).json({ message: 'Дом не найден' });
        }

        // Преобразуем строки в объекты Date
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        // Проверяем, что endDate больше startDate
        if (endDateObj <= startDateObj) {
            return res.status(400).json({ message: 'Дата завершения должна быть после даты начала' });
        }
        // Виртуальное поле для расчета стоимости на основе сроков аренды
        const start = startDateObj.getTime();
        const end = endDateObj.getTime();
        const durationInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const finalCost = durationInDays * house.dailyCost;


        const contactInfo = house.contactInfo
        // Создаем новый объект аренды
        const newHouseBooking = new HouseBooking({
            house: houseId,
            startDate: startDateObj,
            endDate: endDateObj,
            finalCost: finalCost,
            contactInfo: contactInfo
        });

        // Добавляем ссылку на изображение из модели House
        if (house.image) {
            image = house.image;
            newHouseBooking.image = image;
        }
        // Сохраняем в базу данных
        await newHouseBooking.save();

        // Возвращаем успешный ответ
        res.status(201).json({ message: 'Дом успешно арендован', booking: newHouseBooking });
    } catch (error) {
        console.error('Ошибка при аренде дома:', error);
        res.status(500).json({ message: 'Произошла ошибка при аренде дома' });
    }
});

// PUT-маршрут для обновления даты завершения и стоимости бронирования
router.put('/:bookingId', async (req, res) => {
    try {
        // Получаем идентификатор бронирования и новую дату завершения из запроса
        const bookingId = req.params.bookingId;
        const { endDate } = req.body;

        // Проверяем, переданы ли необходимые данные
        if (!bookingId || !endDate) {
            return res.status(400).json({ message: 'Не все обязательные поля заполнены' });
        }

        // Находим бронирование по ID
        const booking = await HouseBooking.findById(bookingId).populate('house');

        // Проверяем, было ли найдено бронирование
        if (!booking) {
            return res.status(404).json({ message: 'Бронирование не найдено' });
        }

        // Преобразуем новую дату завершения в объект Date
        const newEndDateObj = new Date(endDate);

        // Проверяем, что endDate больше startDate
        if (newEndDateObj <= booking.startDate) {
            return res.status(400).json({ message: 'Новая дата завершения должна быть после текущей даты начала' });
        }

        // Вычисляем новую стоимость на основе новых сроков бронирования
        const start = booking.startDate.getTime();
        const end = newEndDateObj.getTime();
        const durationInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const newFinalCost = durationInDays * booking.house.dailyCost;

        // Обновляем данные бронирования
        booking.endDate = newEndDateObj;
        booking.finalCost = newFinalCost;

        // Сохраняем изменения в базе данных
        await booking.save();

        // Возвращаем успешный ответ с обновленными данными бронирования
        res.status(200).json({ message: 'Бронирование успешно обновлено', booking });
    } catch (error) {
        console.error('Ошибка при обновлении бронирования:', error);
        res.status(500).json({ message: 'Произошла ошибка при обновлении бронирования' });
    }
});

// DELETE-маршрут для отмены бронирования дома
router.delete('/:bookingId', async (req, res) => {
    try {
        // Получаем идентификатор бронирования из запроса
        const bookingId = req.params.bookingId;

        // Проверяем, передан ли идентификатор бронирования
        if (!bookingId) {
            return res.status(400).json({ message: 'Не передан идентификатор бронирования' });
        }

        // Используем findByIdAndDelete для поиска и удаления бронирования
        const deletedBooking = await HouseBooking.findByIdAndDelete(bookingId);

        // Проверяем, было ли найдено и удалено бронирование
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Бронирование не найдено' });
        }

        // Возвращаем успешный ответ с информацией об отмене бронирования
        res.status(200).json({ message: 'Бронирование успешно отменено', booking: deletedBooking });
    } catch (error) {
        console.error('Ошибка при отмене бронирования:', error);
        res.status(500).json({ message: 'Произошла ошибка при отмене бронирования' });
    }
});

// GET-маршрут для просмотра аренды дома по ID
router.get('/:bookingId', async (req, res) => {
    try {
        // Получаем идентификатор бронирования из запроса
        const bookingId = req.params.bookingId;

        // Проверяем, передан ли идентификатор бронирования
        if (!bookingId) {
            return res.status(400).json({ message: 'Не передан идентификатор бронирования' });
        }

        // Используем findById для поиска бронирования по идентификатору
        const booking = await HouseBooking.findById(bookingId);

        // Проверяем, было ли найдено бронирование
        if (!booking) {
            return res.status(404).json({ message: 'Бронирование не найдено' });
        }

        // Возвращаем найденное бронирование в ответе
        res.status(200).json({ booking });
    } catch (error) {
        console.error('Ошибка при просмотре аренды:', error);
        res.status(500).json({ message: 'Произошла ошибка при просмотре аренды' });
    }
});


module.exports = router;
