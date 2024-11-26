export class Product {
    constructor(
      public readonly id: string,           // ID unique du produit
      public name: string,                  // Nom du produit
      public price: number,                 // Prix
      public description: string,           // Description du produit
      public createdAt: Date,               // Date de création
      public updatedAt: Date                // Date de dernière mise à jour
    ) {}
  }