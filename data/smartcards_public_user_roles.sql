INSERT INTO public.roles (id, name) VALUES (1, 'ROLE_USER');
INSERT INTO public.roles (id, name) VALUES (2, 'ROLE_MODERATOR');
INSERT INTO public.roles (id, name) VALUES (3, 'ROLE_ADMIN');

INSERT INTO public.users (id, email, password, username) VALUES (1, 'user@smartcards.com', '$2a$10$NQJHD7ibVVOsZE.foeTV3.53Npk19WK5eW8yBzoBIGqEKuHFfSYPe', 'user');
INSERT INTO public.users (id, email, password, username) VALUES (2, 'moderator@smartcards.com', '$2a$10$aPu31iOwHXk2T54/b5xWDOufK.uFh6pS2Duq3j/HEqNmGynIC1TVC', 'moderator');
INSERT INTO public.users (id, email, password, username) VALUES (3, 'admin@smartcards.com', '$2a$10$q6Hr2SktbjBcWLJseJNlmOmqfny3oOzVsr8l5qlDqnDgbxjEDg69m', 'admin');

INSERT INTO public.user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO public.user_roles (user_id, role_id) VALUES (3, 3);
INSERT INTO public.user_roles (user_id, role_id) VALUES (2, 2);