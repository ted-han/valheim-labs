drop table test;

create table test (
  name VARCHAR,
  craft VARCHAR,
  cnt int,
  levelOne BOOLEAN  
);
--추가컬럼: 어떻게 만드는지(노드,가공 등), 설명, 이미지번호, 카테고리



INSERT INTO test VALUES ('자장면','면',4,FALSE);
INSERT INTO test VALUES ('자장면','오이',1,false);
INSERT INTO test VALUES ('면','밀가루',5,FALSE);
INSERT INTO test VALUES ('면','물',1,FALSE);
INSERT INTO test VALUES ('밀가루','밀',10,FALSE);
INSERT INTO test VALUES ('밀',null,0,true);
INSERT INTO test VALUES ('물',null,0,true);
INSERT INTO test VALUES ('오이',null,0,true);
INSERT INTO test VALUES ('고기',null,0,true);
INSERT INTO test VALUES ('훈제','고기',1,false);
INSERT INTO test VALUES ('미트볼','고기',2,false);
INSERT INTO test VALUES ('미트볼','물',1,false);


select * from test order by name;


--리스트 상단 쿼리
select 
	name,
	1 as cnt,
	string_agg(concat('{name:',craft,', cnt:',cnt,'}'), ',') as craft,
	levelOne
from test
group by name,levelOne;


--리스트 하단 쿼리
with step1 as (
	select * 
	from test
	where craft is not null
),
step2 as (
select 
	name,
	1 as cnt,
	string_agg(concat('{name:',craft,', cnt:',cnt,'}'), ',') as craft,
	levelOne
from test
group by name,levelOne
)
select 
	step1.craft,
	step1.name,
	step2.craft
from step1 
JOIN step2
ON step1.name = step2.name
ORDER BY step1.craft;

