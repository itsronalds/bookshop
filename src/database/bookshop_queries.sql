USE bookshop;

DESCRIBE book;
DESCRIBE author;
DESCRIBE book_author;

SELECT * FROM book;
SELECT * FROM author;
SELECT * FROM book_author;

SELECT * FROM author WHERE Lower(Name) = Lower('ronald abu saleh');

DELETE FROM author;

ALTER TABLE book_author 
ADD CONSTRAINT `FK_Book` 
FOREIGN KEY (BookID) 
REFERENCES book (BookID) 
ON DELETE CASCADE;

ALTER TABLE `book_author` 
DROP FOREIGN KEY `FK_Book`; 

TRUNCATE TABLE book;
TRUNCATE TABLE author;
TRUNCATE TABLE book_author;

SET FOREIGN_KEY_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 1;