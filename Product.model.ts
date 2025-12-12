import { Column, Table, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'product',
})
export class Product extends Model {
  @Column
  name: string;

  @Column(DataType.TEXT)
  detail: string;

  @Column
  vendor: string;

  @Column
  rating: number;

  @Column
  size: string;

  @Column(DataType.JSON)
  image: string;

  @Column
  price: number;

  @Column
  promotionAsPercentage: number;

  @Column
  discountcolor: string;

  @Column
  categoryId: number;

  @Column(DataType.BOOLEAN)
  inStock: boolean;

  @Column
  countSold: number;

  @Column
  groupId: number;
}
