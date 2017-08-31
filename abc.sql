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


test select thanh pho

aassdas

SELECT * 
FROM
location,districts,city
WHERE location.id_districts = districts.id_districts 
AND districts.id_city = city.id_city 
AND city.id_city = 1 AND
ORDER BY location.id DESC   

select name from city where id_city = 1

select name_districts,name from districts,city where id_districts = 1 and city.id_city = 1

select * 
from
location,districts,city
where location.id_districts = districts.id_districts 
and districts.id_city = city.id_city 
and city.id_city = 1 and districts and location.id_category = 4 
order by location.id asc


bucac
﻿select * from location,images
where location.id_location = images.id_location
and images.show_img = 'true'
and location.name_location ilike '%f mart%'

select * from location,images,districts
where location.id_location = images.id_location
and images.show_img = 'true'
and location.id_districts = districts.id_districts
and districts.name_districts ilike '%quận hoàn kiếm%'

select * from location,images,districts,city
where location.id_location = images.id_location
and images.show_img = 'true'
and location.id_districts = districts.id_districts
and districts.id_city = city.id_city
and city.name ilike '%hà nội%'

select * from location,images,sub_category
where location.id_location = images.id_location
and images.show_img = 'true'
and location.id_category = sub_category.id_sub_category
and sub_category.name_castegory ilike '%cửa hàng%'

select * from location,images,sub_category,categories
where location.id_location = images.id_location
and images.show_img = 'true'
and location.id_category = sub_category.id_sub_category
and sub_category.id_categories = categories.id_categories
and categories.name_categories ilike '%ă%'

