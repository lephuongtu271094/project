ĐÂY LÀ ĐỐNG TEST LOCATION CHO TRANG CHỦ

SELECT * FROM sub_category,categories,location WHERE categories.id_categories = sub_category.id_categories and id_sub_category = location.id_category and show_location = false ORDER BY categories.id_categories ASC

UPDATE location SET show_location='true' WHERE id_location='rJxbK83GdZ'

select * from location where show_location = 'true'

UPDATE images SET show_img='true' WHERE id_image =292

select * from images where show_img = 'true'

select * from images where id_location = 'S1gGgd2GdZ'

SElECT * FROM sub_category,location,images WHERE id_sub_category = location.id_category AND location.id_location = images.id_location AND show_location = true AND show_img = true

SELECT sub_category.id_sub_category,* FROM sub_category,location WHERE id_sub_category = location.id_category AND show_location = true

CHI TIET
﻿SELECT * FROM location,districts,city where location.id_districts = districts.id_districts and districts.id_city = city.id_city and id_location = 'rypwYE-O-'