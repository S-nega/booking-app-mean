const express = require('express');
const router = express.Router();
const HouseBooking = require('../models/housebooking');
const House = require('../models/house');

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

module.exports = router;
