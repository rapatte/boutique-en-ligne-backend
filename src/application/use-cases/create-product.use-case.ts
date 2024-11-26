import { Product } from '../../domain/entities/product.entity';
import { ProductRepositoryPort } from '../../domain/ports/product-repository.port';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async execute(data: {
    name: string;
    price: number;
    description: string;
  }): Promise<Product> {
    // Crée une instance de l'entité produit
    const product = new Product(
      crypto.randomUUID(),    // Génère un identifiant unique
      data.name,              // Nom du produit
      data.price,             // Prix
      data.description,       // Description
      new Date(),             // Date de création
      new Date()              // Date de mise à jour
    );

    // Persiste l'entité via le port
    return this.productRepository.create(product);
  }
}
