INSERT INTO public.roles (name) VALUES ('ROLE_USER');
INSERT INTO public.roles (name) VALUES ('ROLE_MODERATOR');
INSERT INTO public.roles (name) VALUES ('ROLE_ADMIN');

INSERT INTO public.users (email, password, username) VALUES ('user@smartcards.com', '$2a$10$NQJHD7ibVVOsZE.foeTV3.53Npk19WK5eW8yBzoBIGqEKuHFfSYPe', 'user');
INSERT INTO public.users (email, password, username) VALUES ('moderator@smartcards.com', '$2a$10$aPu31iOwHXk2T54/b5xWDOufK.uFh6pS2Duq3j/HEqNmGynIC1TVC', 'moderator');
INSERT INTO public.users (email, password, username) VALUES ('admin@smartcards.com', '$2a$10$q6Hr2SktbjBcWLJseJNlmOmqfny3oOzVsr8l5qlDqnDgbxjEDg69m', 'admin');

INSERT INTO public.user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO public.user_roles (user_id, role_id) VALUES (3, 3);
INSERT INTO public.user_roles (user_id, role_id) VALUES (2, 2);

INSERT INTO public.myclasses (title, user_id) VALUES ('My First class', 1);
INSERT INTO public.myclasses (title, user_id) VALUES ('My Second class', 1);
INSERT INTO public.myclasses (title, user_id) VALUES ('React', 1);
INSERT INTO public.myclasses (title, user_id) VALUES ('Java', 1);
INSERT INTO public.myclasses (title, user_id) VALUES ('Git', 1);

INSERT INTO public.decks (is_public, title, my_class_id) VALUES (false, 'English', 1);
INSERT INTO public.decks (is_public, title, my_class_id) VALUES (false, 'History', 2);
INSERT INTO public.decks (is_public, title, my_class_id) VALUES (false, 'Valami', 2);
INSERT INTO public.decks (is_public, title, my_class_id) VALUES ( false, 'Hooks', 3);
INSERT INTO public.decks (is_public, title, my_class_id) VALUES ( false, 'Props', 3);
INSERT INTO public.decks (is_public, title, my_class_id) VALUES ( false, 'OOP', 4);
INSERT INTO public.decks (is_public, title, my_class_id) VALUES ( false, 'Spring Boot', 4);

INSERT INTO public.cards (answer, question, deck_id) VALUES ('továbbadni', 'to pass on', 1);
INSERT INTO public.cards (answer, question, deck_id) VALUES ('válasz', 'response', 1);
INSERT INTO public.cards (answer, question, deck_id) VALUES ('kérés', 'request', 1);
INSERT INTO public.cards (answer, question, deck_id) VALUES ('fejleszt', 'develop', 1);
INSERT INTO public.cards (answer, question, deck_id) VALUES ('egyértelműen', 'definitely', 1);
INSERT INTO public.cards (answer, question, deck_id) VALUES ('magától értetődően', 'obviously', 1);
INSERT INTO public.cards (answer, question, deck_id) VALUES ('hatékony', 'efficient', 1);
INSERT INTO public.cards (answer, question, deck_id) VALUES ('kitartó', 'persistent', 1);
INSERT INTO public.cards (answer, question, deck_id) VALUES ('fenntart', 'maintain', 1);
