from django.contrib import admin
from .models import *
from django.utils.html import format_html
from django.conf import settings

# Register your models here.

class ReviewInLine(admin.TabularInline): #StackedInline, TabularInline
    model = Review
    extra = 0

class OrderItemInLine(admin.TabularInline): #StackedInline, TabularInline
    model = OrderItem
    extra = 0
class ProductAdmin(admin.ModelAdmin):
    #fields = ['image_custom','name'] #giới hạn các field show trong màn hình edit
    #readonly_fields = ['image_custom'] #định nghĩa trường nào không cho update, chỉ read-only
    # fieldsets = [ #nhóm lại các field trong cùng section riêng với nhau
    #     (None, {'fields': ['question_text']}),
    #     ('Date information', {'fields': ['pub_date']})
    # ]
    inlines = [OrderItemInLine, ReviewInLine]
    list_display = ('_id','name','image_custom','createdAt_custom','user_custom')
    list_display_links = ('name', )
    list_filter = ['user', 'brand', 'createdAt', 'category', 'rating']
    search_fields = ['name', 'brand', 'category', 'description']

    def user_custom(self, obj):
        return format_html("<a href='/admin/auth/user/{0}/change/'>{1}</a>", obj.user.id, obj.user)
    user_custom.admin_order_field = 'user'
    user_custom.short_description = "user"

    def createdAt_custom(self, obj):
        return obj.createdAt.strftime("%d/%m/%Y %H:%M:%S")
    createdAt_custom.admin_order_field = 'createdAt'
    createdAt_custom.short_description = 'createdAt'   

    def image_custom(self, obj):
        url = "https://%s.s3.amazonaws.com/%s" % (settings.AWS_STORAGE_BUCKET_NAME, str(obj.image).strip('/'))
        return format_html('<a href="{0}" target="_blank"><img src="{0}" height="50" /></a>', url)
    image_custom.short_description = 'Image'

admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)