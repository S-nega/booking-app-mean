const express = require('express');
const router = express.Router();
const House = require('../models/house');

// Маршрут для добавления дома
router.post('/add-house', async (req, res) => {
  try {
    // console.log(req.body.location); 
    const { location, houseType, numberOfRooms, monthlyCost, contactInfo } = req.body;
    // console.log(req.body.location);
    // Проверяем, что обязательные поля переданы
    if (!location || !houseType || !numberOfRooms || !monthlyCost || !contactInfo) {
      return res.status(400).json({ message: 'Не все обязательные поля заполнены' });
    }

    // Создаем новый объект дома
    const newHouse = new House({
      location: location,
      houseType: houseType,
      numberOfRooms: numberOfRooms,
      monthlyCost: monthlyCost,
      contactInfo: contactInfo,
      // Другие поля, если необходимо
    });

    // Сохраняем в базу данных
    await newHouse.save();

    // Возвращаем успешный ответ
    res.status(201).json({ message: 'Дом успешно добавлен', house: newHouse });
    } catch (error) {
    console.error('Ошибка добавления дома:', error);
    // console.log(req.body);99
    // console.log(req.body.location);
    res.status(500).json({ message: 'Произошла ошибка при добавлении дома' });
    }
  });

module.exports = router;
