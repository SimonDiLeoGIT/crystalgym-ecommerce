from app.utils.singletonMeta import SingletonMeta

class PaginationHelper(metaclass=SingletonMeta):

    def generate_pagination(self, page, total_items, query):
        offset = (int(page) - 1) * int(total_items)
        data = query.offset(offset).limit(total_items).all()
        return data

    def get_pagination_data(self, page, total_items, total_pages):
        page = int(page)
        total_items = int(total_items)
        return {
            'current_page': page,
            'offset': page * total_items,
            'total_items': total_items,
            'total_pages': total_pages,  # Aquí puedes calcular el total de páginas si tienes el número total de prendas
            'next_page': page + 1 if page < total_pages else None,
            'prev_page': page - 1 if page > 1 else None
        }