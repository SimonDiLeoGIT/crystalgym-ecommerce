from marshmallow import fields, Schema

class ClotheImageSchema(Schema):
    image_file = fields.Raw(required=True)  # Raw se usa para manejar archivos binarios

class ClotheColorSchema(Schema):
    id_color = fields.Int(required=True)
    images = fields.List(fields.Nested(ClotheImageSchema), required=True)
    stock = fields.Int(required=True)
    price = fields.Float(required=False)

class ClothesSchema(Schema):
    id = fields.Int(required=False)
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    id_category = fields.Int(required=True)
    id_gender = fields.Int(required=True)
    price = fields.Float(required=False)
    colors = fields.List(fields.Nested(ClotheColorSchema), required=True)
