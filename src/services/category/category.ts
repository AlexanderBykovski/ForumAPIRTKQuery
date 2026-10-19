import type { CategoryRepository } from
  "../../domain/category/repository.js";
import type { CategoryService } from "./category.types.js";

export function createCategoryService(
  repository: CategoryRepository,
): CategoryService {
  return {
    getCategories() {
      return repository.getAll();
    },

    getCategoryById(id) {
      return repository.getById(id);
    },

    async createCategory(input) {
      const name = input.name.trim();
      if (!name) throw new Error("INVALID_CATEGORY_DATA");
      return repository.createCategory({ name });
    },
  };
}
