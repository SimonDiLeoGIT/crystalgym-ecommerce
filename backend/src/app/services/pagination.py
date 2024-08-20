from app.services.singletonMeta import SingletonMeta

class PaginationHelper(metaclass=SingletonMeta):
    def generate_pagination(self, page, total_items):
        page = int(page)
        total_items = int(total_items)
        return {
            'current_page': page,
            'offset': page * total_items,
            'total_items': total_items,
            'total_pages': 0,  # Aquí puedes calcular el total de páginas si tienes el número total de prendas
            'next_page_url': page + 1,
            'prev_page_url': page - 1 if page > 1 else None
        }