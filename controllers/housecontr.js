const express = require('express');
const router = express.Router();
const House = require('../models/house');
const fs = require('fs');
const path = require('path');


// http://localhost:8080/api/house Адрес маршрутов

// Маршрут для добавления дома с изображением
router.post('/', async (req, res) => {
  console.log("house controller try to add house");//не доходит при вызове через браузер 
  try {
    const { location, hotelName, houseType, numberOfRooms, dailyCost, contactInfo, description } = req.body;

    // Обработка загруженного файла
    const uploadedFile = req.file;
    const uniqueFileName = `${Date.now()}_${uploadedFile.originalname}`;
    const imagePath = `public/images/${uniqueFileName}`;
    fs.writeFileSync(imagePath, uploadedFile.buffer);

    if (!location || !hotelName || !houseType || !numberOfRooms || !dailyCost || !contactInfo || !description) {
      // Удаляем загруженный файл в случае ошибки валидации
      fs.unlinkSync(imagePath);
      return res.status(400).json({ message: 'Не все обязательные поля заполнены' });
    }

    const newHouse = new House({
      location,
      hotelName,
      houseType,
      numberOfRooms,
      dailyCost,
      contactInfo,
      description,
      image: imagePath, // Сохраняем путь к изображению
    });

    await newHouse.save();

    res.status(201).json({ message: 'Дом успешно добавлен', house: newHouse });
  } catch (error) {
    console.error('Ошибка добавления дома:', error);
    res.status(500).json({ message: 'Произошла ошибка при добавлении дома' });
  }
});

// Маршрут для получения всех домов
router.get('/', async (req, res) => {
  try {
    // Извлекаем все дома из базы данных
    const houses = await House.find();

    // Возвращаем список домов в ответе
    console.log('hotels list');
    console.log({houses});
    // res.status(200).render('housing', {houses: houses})
    res.status(200).json({ houses });
  } catch (error) {
    console.error('Ошибка при получении списка домов:', error);
    res.status(500).json({ message: 'Произошла ошибка при получении списка домов' });
  }
});

// Маршрут для обновления информации о доме
router.put('/:id', async (req, res) => {
  try {
    const { location, hotelName, houseType, numberOfRooms, dailyCost, description, contactInfo } = req.body;

    // Проверяем, что обязательные поля переданы
    if (!location || !hotelName || !houseType || !numberOfRooms || !dailyCost || !description || !contactInfo) {
      return res.status(400).json({ message: 'Не все обязательные поля заполнены' });
    }

    // Находим и обновляем информацию о доме по ID
    const updatedHouse = await House.findByIdAndUpdate(req.params.id, {
      location,
      hotelName,
      houseType,
      numberOfRooms,
      dailyCost,
      description,
      contactInfo,
      // Другие поля, если необходимо
    }, { new: true }); // { new: true } возвращает обновленный документ

    // Проверка, был ли найден и обновлен дом
    if (!updatedHouse) {
      return res.status(404).json({ message: 'Дом не найден' });
    }

    // Если загружено новое изображение, обновляем поле с изображением
    if (req.file) {
      // Удаление старого изображения из хранилища
      if (updatedHouse.image) {
        console.log(updatedHouse.image);
        fs.unlinkSync(path.join( __dirname, '../',  updatedHouse.image));
      }
      // Сохранение нового изображения
      const imageName = `public/images/${Date.now()}_${req.file.originalname}`;
      fs.writeFileSync(path.join(__dirname, '../', imageName), req.file.buffer);
      updatedHouse.image = imageName;
      await updatedHouse.save();
    }
    // Возвращаем успешный ответ с обновленной информацией о доме
    res.status(200).json({ message: 'Информация о доме успешно обновлена', house: updatedHouse });
  } catch (error) {
    console.error('Ошибка при обновлении информации о доме:', error);
    res.status(500).json({ message: 'Произошла ошибка при обновлении информации о доме' });
  }
});

// Маршрут для удаления дома
router.delete('/:id', async (req, res) => {
  try {
    // Находим и удаляем дом по ID
    const deletedHouse = await House.findByIdAndDelete(req.params.id);

    // Проверка, был ли найден и удален дом
    if (!deletedHouse) {
      return res.status(404).json({ message: 'Дом не найден' });
    }

    // Удаление старого изображения из хранилища
    if (deletedHouse.image) {
      fs.unlinkSync(path.join(__dirname, '../', deletedHouse.image));
    }
    // Возвращаем успешный ответ с удаленной информацией о доме
    res.status(200).json({ message: 'Дом успешно удален', house: deletedHouse });
  } catch (error) {
    console.error('Ошибка при удалении дома:', error);
    res.status(500).json({ message: 'Произошла ошибка при удалении дома' });
  }
});


module.exports = router;