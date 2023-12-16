import { Order, OrderItem, Product, User } from '@prisma/client';

export type UserIdentifier = Pick<User, 'id'>['id'];
export type OrderIdentifier = Pick<Order, 'id'>['id'];
export type OrderItemIdentifier = Pick<OrderItem, 'id'>['id'];
export type ProductIdentifier = Pick<Product, 'id'>['id'];
