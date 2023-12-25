const express = require('express');
const router = express.Router();
const House = require('../models/house');
const fs = require('fs');
const path = require('path');
const { verifyToken } = require("../validation");

// http://localhost:8080/api/house Адрес маршрутов
// Маршрут для добавления дома с изображением
router.post('/', verifyToken, async (req, res) => {
  console.log("house controller try to add house");//доходит при вызове через браузер 
  try {
    const { location, hotelName, houseType, numberOfRooms, dailyCost, contactInfo, description } = req.body;

    if (!location || !hotelName || !houseType || !numberOfRooms || !dailyCost || !contactInfo || !description) {
      return res.status(400).json({ message: 'Не все обязательные поля заполнены' });
    }
    // Обработка загруженного файла
    let imagePath = null
    if (req.file) {
      const uploadedFile = req.file;
      const uniqueFileName = `${Date.now()}_${uploadedFile.originalname}`;
      imagePath = `public/images/${uniqueFileName}`;
      console.log(imagePath);
      fs.writeFileSync(imagePath, uploadedFile.buffer);
    }

    const newHouse = new House({
      location,
      hotelName,
      houseType,
      numberOfRooms,
      dailyCost,
      contactInfo,
      description,
    });

    if (req.file) {
      newHouse.image = imagePath; // Добавляем путь к изображению, если он существует
    }

    await newHouse.save();
    res.status(201).json({ message: 'Дом успешно добавлен', house: newHouse });
    // res.redirect('houses'); //отправить на общий список
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
    console.log({ houses });
    // res.status(200).render('housing', {houses: houses})
    res.status(200).json({ houses }); // данные не отображаются в браузере, только в консоли
    // res.status(200).render('housing', {houses})
  } catch (error) {
    console.error('Ошибка при получении списка домов:', error);
    res.status(500).json({ message: 'Произошла ошибка при получении списка домов' });
  }
});

// Маршрут для обновления информации о доме
router.put('/:id', verifyToken, async (req, res) => {
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
        fs.unlinkSync(path.join(__dirname, '../', updatedHouse.image));
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
router.delete('/:id',verifyToken, async (req, res) => {
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

// Маршрут для удаления всех домов
router.delete('/',verifyToken, async (req, res) => {
  try {
    const houses = await House.find({});

    // Удаление изображений из хранилища (если используются)
    for (const house of houses) {
      if (house.image) {
        fs.unlinkSync(path.join(__dirname, '../', house.image));
      }
    }
    // Находим и удаляем все дома из базы данных
    const deletedHouses = await House.deleteMany({});
    res.status(200).json({ message: 'Все дома успешно удалены', deletedHouses });
  } catch (error) {
    console.error('Ошибка при удалении всех домов:', error);
    res.status(500).json({ message: 'Произошла ошибка при удалении всех домов' });
  }
});

// GET-маршрут для поиска домов по location и количеству комнат
router.get('/search', async (req, res) => {
  try {
    // Получаем значения location и numberOfRooms из параметров запроса
    const {location, numberOfRooms} = req.query;

    console.log(location);
    console.log(numberOfRooms);

    // Если не переданы оба параметра, выполняем поиск без учета этих параметров
    const searchParams = {};
    if (location) {
      searchParams.location = location;
    }
    if (numberOfRooms) {
      searchParams.numberOfRooms = numberOfRooms;
    }
    // Ищем дома по заданным location и numberOfRooms
    const houses = await House.find(searchParams);

    // Проверяем, были ли найдены дома
    if (!houses || houses.length === 0) {
      return res.status(404).json({ message: 'Дома не найдены для указанных location и numberOfRooms' });
    }

    // Возвращаем найденные дома в ответе
    res.status(200).json({ houses });
  } catch (error) {
    console.error('Ошибка при поиске домов по location и numberOfRooms:', error);
    res.status(500).json({ message: 'Произошла ошибка при поиске домов по location и numberOfRooms' });
  }
});


// GET-маршрут для получения списка уникальных значений location
router.get('/locations', async (req, res) => {
  try {
      // Используем метод distinct для получения уникальных значений location
      const uniqueLocations = await House.distinct('location');

      // Проверяем, были ли найдены уникальные значения location
      if (!uniqueLocations || uniqueLocations.length === 0) {
          return res.status(404).json({ message: 'Уникальные значения location не найдены' });
      }

      // Возвращаем уникальные значения location в ответе
      res.status(200).json({ uniqueLocations });
  } catch (error) {
      console.error('Ошибка при получении уникальных значений location:', error);
      res.status(500).json({ message: 'Произошла ошибка при получении уникальных значений location' });
  }
});


module.exports = router;