CREATE VIRTUAL TABLE `guest_fts` USING fts5(
	full_name,
	content='guest',
	content_rowid='id'
);

-- Populate the FTS table with existing data
INSERT INTO guest_fts(rowid, full_name) 
SELECT id, full_name FROM guest WHERE full_name IS NOT NULL;

-- Create triggers to keep FTS table in sync
CREATE TRIGGER guest_fts_insert AFTER INSERT ON guest BEGIN
  INSERT INTO guest_fts(rowid, full_name) VALUES (NEW.id, NEW.full_name);
END;

CREATE TRIGGER guest_fts_delete AFTER DELETE ON guest BEGIN
  INSERT INTO guest_fts(guest_fts, rowid, full_name) VALUES ('delete', OLD.id, OLD.full_name);
END;

CREATE TRIGGER guest_fts_update AFTER UPDATE ON guest BEGIN
  INSERT INTO guest_fts(guest_fts, rowid, full_name) VALUES ('delete', OLD.id, OLD.full_name);
  INSERT INTO guest_fts(rowid, full_name) VALUES (NEW.id, NEW.full_name);
END;
