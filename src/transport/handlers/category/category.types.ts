import type { Request, Response } from "express";
import type { CreateCategoryRequest } from "../../dto/category/requests";
import type { CategoryResponse } from "../../dto/category/responses";

export interface CategoryHandlers {
  getCategories(req: Request, res: Response): Promise<void>;
  getCategoryById(req: Request, res: Response): Promise<void>;
  createCategory(
    req: Request<{}, {}, CreateCategoryRequest>,
    res: Response<CategoryResponse | { message: string }>,
  ): Promise<void>;
}