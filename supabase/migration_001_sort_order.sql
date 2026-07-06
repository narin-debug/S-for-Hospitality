-- 이미 schema.sql을 실행한 기존 Supabase 프로젝트에 sort_order 컬럼을 추가하는 마이그레이션.
-- 새 프로젝트라면 이 파일 대신 schema.sql만 실행하면 됩니다.

alter table indicators add column if not exists sort_order integer not null default 0;

update indicators set sort_order = 1 where name = '목표 수립 및 공시';
update indicators set sort_order = 2 where name = '신규 채용 및 고용 유지';
update indicators set sort_order = 3 where name = '정규직 비율';
update indicators set sort_order = 4 where name = '자발적 이직률';
update indicators set sort_order = 5 where name = '1인당 교육훈련비';
update indicators set sort_order = 6 where name = '여성 구성원 비율';
update indicators set sort_order = 7 where name = '여성 급여 비율';
update indicators set sort_order = 8 where name = '장애인 고용률';
