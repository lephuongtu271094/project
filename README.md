# project

## Create table :

### Thành phố : 
```sql
    ﻿create table city(
    	id_city serial primary key,
        name varchar(100)
    )
```
### Quận :
```sql
﻿create table districts(
	id_districts serial primary key,
    name_districts varchar(100),
    id_city int,
  	FOREIGN KEY (id_city) REFERENCES city (id_city)
);
```
### Location :
```sql
﻿create table location(
	id_location text primary key,
    name text,
   	address text,
   	time_open text,
    rate double precision,
    lat double precision,
   	long double precision,
    id_castegory int,
    id_districts int,
    FOREIGN KEY (id_castegory) REFERENCES castegories (id_castegory),
    FOREIGN KEY (id_districts) REFERENCES districts (id_districts)
);
```
### Images :
```sql
﻿create table images(
	id_image serial primary key,
    name_img text,
    id_location text,
    foreign key (id_location) references location (id_location)
);
```
### Book :
```sql
﻿create table book(
	id_book serial primary key,
    id_location text,
    time varchar(50),
    date varchar(50),
    soluong int,
    nguoidat varchar(100),
    phone int,
    note text,
    email text,
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

