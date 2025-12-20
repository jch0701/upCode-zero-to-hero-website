-- Delete isViewed record for the chapter that has been updated
CREATE OR REPLACE FUNCTION delete_readchapter_after_update()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM "ReadChapter"
    WHERE "chapterID" = NEW."chapterID";

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_after_update_chapter
AFTER UPDATE ON "Chapters"
FOR EACH ROW
EXECUTE FUNCTION delete_readchapter_after_update();

-- Delete isViewed record for the link that has been updated
CREATE OR REPLACE FUNCTION delete_readnode_after_update()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM "ReadNode"
    WHERE "nodeID" = NEW."nodeID";

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_after_update_node
AFTER UPDATE ON "Nodes"
FOR EACH ROW
EXECUTE FUNCTION delete_readnode_after_update();



-- Synchronous modifiedDate for chapter if link alter
CREATE OR REPLACE FUNCTION update_chapter_modified_date()
RETURNS TRIGGER AS $$
BEGIN
    -- INSERT or UPDATE
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE "Chapters"
        SET "modifiedDate" = NOW()
        WHERE "chapterID" = NEW."chapterID";
        RETURN NEW;
    END IF;

    -- DELETE
    IF TG_OP = 'DELETE' THEN
        UPDATE "Chapters"
        SET "modifiedDate" = NOW()
        WHERE "chapterID" = OLD."chapterID";
        RETURN OLD;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_chapter_modifiedDate_after_insert_node
AFTER INSERT ON "Nodes"
FOR EACH ROW
EXECUTE FUNCTION update_chapter_modified_date();

CREATE TRIGGER trg_chapter_modifiedDate_nodes_after_update_node
AFTER UPDATE ON "Nodes"
FOR EACH ROW
EXECUTE FUNCTION update_chapter_modified_date();

CREATE TRIGGER trg_chapter_modifiedDate_nodes_after_delete_node
AFTER DELETE ON "Nodes"
FOR EACH ROW
EXECUTE FUNCTION update_chapter_modified_date();


-- Synchronous modifiedDate for roadmap if chapter alter
CREATE OR REPLACE FUNCTION update_roadmap_modified_date()
RETURNS TRIGGER AS $$
BEGIN
    -- INSERT or UPDATE
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE "Roadmaps"
        SET "modifiedDate" = NOW()
        WHERE "roadmapID" = NEW."roadmapID";
        RETURN NEW;
    END IF;

    -- DELETE
    IF TG_OP = 'DELETE' THEN
        UPDATE "Roadmaps"
        SET "modifiedDate" = NOW()
        WHERE "roadmapID" = OLD."roadmapID";
        RETURN OLD;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_roadmap_modifiedDate_after_insert_chapter
AFTER INSERT ON "Chapters"
FOR EACH ROW
EXECUTE FUNCTION update_roadmap_modified_date();

CREATE TRIGGER trg_roadmap_modifiedDate_after_update_chapter
AFTER UPDATE ON "Chapters"
FOR EACH ROW
EXECUTE FUNCTION update_roadmap_modified_date();

CREATE TRIGGER trg_roadmap_modifiedDate_after_delete_chapter
AFTER DELETE ON "Chapters"
FOR EACH ROW
EXECUTE FUNCTION update_roadmap_modified_date();