import { BookService } from "./book.service"
import { CategoryService } from "./category.service"
import { UserService } from "./user.service"

export const Service = {
  user: new UserService(),
  book: new BookService(),
  category: new CategoryService(),
}
