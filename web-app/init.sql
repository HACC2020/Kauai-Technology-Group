create table density 
(
  Device      text,
  "Max Clients" float,
  "Unique Clients" float,
  Building      text,
  date_start      timestamp with time zone,
  date_end        timestamp  with time zone,
  occ_ratio     float
);
COPY density(Device, "Max Clients", "Unique Clients", Building, date_start, date_end, occ_ratio)
FROM '/data/full_data.csv'
DELIMITER ','
CSV HEADER;
