# project

## Tạo Database :

### Thành phố,Quận/Huyện : 
```sql
    ﻿CREATE TABLE city(
    	id_city serial primary key,
        name varchar(100)
    )
    
    CREATE TABLE districts(
    	id_districts serial primary key,
        name_districts varchar(100),
        id_city int,
      	FOREIGN KEY (id_city) REFERENCES city (id_city)
```

### castegories :
```sql
   ﻿create table categories(
       id_categories serial primary key,
       name_categories varchar(100)
       );
       
       
   ﻿create table sub_category(
       id_sub_category serial primary key,
       name_castegory varchar(100),
       id_categories int,
       FOREIGN KEY (id_categories) REFERENCES categories (id_categories)
       );
```

### Location :
```sql
﻿﻿﻿CREATE TABLE location(
    id SERIAL,
   	id_location TEXT primary key,
    name_location TEXT,
    address TEXT,
    time_open TEXT,
    rate DOUBLE PRECISION,
    lat DOUBLE PRECISION,
    long DOUBLE PRECISION,
    id_category INT,
    show_location BOOLEAN,
    id_districts INT,
    FOREIGN KEY (id_category) REFERENCES sub_category (id_sub_category),
    FOREIGN KEY (id_districts) REFERENCES districts (id_districts)
   );
```
### Images :
```sql
﻿﻿CREATE TABLE images(
    id_image SERIAL PRIMARY KEY,
 	show_img BOOLEAN,
    name_img TEXT,
    id_location TEXT,
    FOREIGN KEY (id_location) REFERENCES location (id_location)
);
```
### Book :
```sql
﻿CREATE TABLE book(
	id_book serial primary key,
    id_location text,
    time varchar(50),
    date varchar(50),
    soluong int,
    nguoidat varchar(100),
    phone int,
    note text,
    email text,
    name_location varchar(200),
    foreign key (id_location) references location (id_location)
);
```

## Insert Table

### Table city 
```sql
﻿INSERT INTO city(name) VALUES 
    ('Hà Nội'),
    ('TP.Hồ Chí Minh');
```
### Table districts
```sql
﻿INSERT INTO districts(name_districts,id_city) VALUES 
    ('Quận Hoàn Kiếm','1'),
    ('Quận Tây Hồ','1'),
    ('Quận Ba Đình','1'),
    ('Quận Thanh Xuân','1'),
    ('Quận Hai Bà Trưng','1'),
    ('Quận Đống Đa','1'),
    ('Quận Hoàng Mai','1'),
    ('Quận Long Biên','1'),
    ('Quận Hà đông','1'),
    ('Quận Nam Từ Liêm','1'),
    ('Quận Bắc Từ Liêm','1'),
    ('Quận Ba Vì','1'),
    ('Quận Chương Mỹ','1'),
    ('Quận Đan Phượng','1'),
    ('Quận Đông Anh','1'),
    ('Quận Gia Lâm','1'),
    ('Quận Hoài Đức','1'),
    ('Quận Mê Linh','1'),
    ('Quận Mỹ Đức','1'),
    ('Quận 1','2'),
    ('Quận 2','2'),
    ('Quận 3','2'),
    ('Quận 4','2'),
    ('Quận 5','2'),
    ('Quận 6','2'),
    ('Quận 7','2'),
    ('Quận 8','2'),
    ('Quận 9','2'),
    ('Quận 10','2'),
    ('Quận 11','2'),
    ('Quận 12','2'),
    ('Quận Bình Thạnh','2'),
    ('Quận Phú Nhuận','2'),
    ('Quận Gò Vấp','2'),
    ('Quận Thủ Đức','2');
```

### Table categories:
```sql
    ﻿insert into categories(name_categories) values 
        ('Ăn Uống'),
        ('Làm Đẹp'),
        ('Giải Trí'),
        ('Sức Khỏe'),
        ('Mua Sắm');
    
    
    ﻿insert into sub_category(name_castegory,id_categories) values 
        ('Quán Coffee','1'),
        ('Nhà Hàng','1'),
        ('Quán Ăn','1'),
        ('Tiệm cắt tóc/gội đầu','2'),
        ('Thẩm mĩ viện','2'),
        ('Tiệm nail','2'),
        ('Spa/massage','2'),
        ('Khu chơi game','3'),
        ('Rạp chiếu phim','3'),
        ('Karaoke','3'),
        ('Tập thể hình','4'),
        ('Tập yoga','4'),
        ('Phòng khám','4'),
        ('Nha khoa','4'),
        ('Trung tâm thương mại','5'),
        ('Siêu thị','5'),
        ('Cửa hàng','5'),
        ('Chợ','5');

```
### insert hai bảng location và images ở trang
https://github.com/lephuongtu271094/nightmare.git


```slq
    ﻿SELECT castegories.id_castegory,(array(
    	SELECT row_to_json(location) FROM location
        JOIN castegories AS c1 ON c1.id_castegory = location.id_castegory  
        WHERE location.id_castegory = castegories.id_castegory limit 1
    ))FROM castegoriesa
    
    
    
    SELECT location.id_location ,(array(
    	SELECT row_to_json(images) FROM images
        JOIN location AS c2 ON c2.id_location = images.id_location 
         WHERE images.id_location = location.id_location
    ))FROM location where id_location = 'r1LjKV-O-'
    

```