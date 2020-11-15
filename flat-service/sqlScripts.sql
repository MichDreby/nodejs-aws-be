--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--  id: string,
--  address: string,
--  area: number,
--  city: string,
--  district: string,
--  price: number
--  rooms: number

--create table flats (
--	id uuid primary key default uuid_generate_v4(),
--    address text not null,
--    area integer,
--    city text not null,
--    district text,
--    price integer,
--    rooms integer
--)

--drop table flats

--create table stocks (
--	flat_id uuid,
--    count integer,
--    foreign key (flat_id) references flats(id)
--)

--

--insert into flats(address, area, city, district, price, rooms)
--values('Ignatovskogo 12', 65, 'Minsk', 'Frunzensky', 300, 2)


--insert into stocks(flat_id, count)
--values((SELECT id FROM flats where area=65), round(random() * 10 ) )


--TRUNCATE TABLE stocks ;


--select * from flats 



--SELECT *
--FROM flats
--full outer join stocks
--ON flats.id = stocks.flat_id


--SELECT id
--FROM flats
--LEFT outer JOIN stocks
--ON flats.id = stocks.flat_id
--WHERE flat_id IS NULL

--INSERT INTO stocks (flat_id, count)
--SELECT id, round(random() * 10)
--FROM flats
--LEFT outer JOIN stocks
--ON flats.id = stocks.flat_id
--WHERE flat_id IS NULL





