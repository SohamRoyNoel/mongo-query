db.products.aggregate([
  {
    "$match": {
      "$and": [
        {
          "isDeleted": false
        },
        {
          "isArchived": false
        },
        {
          "_id": ObjectId("643fcdc51e9fad05ab88bca5")
        }
      ]
    }
  },
  {
    "$lookup": {
      "from": "products",
      "localField": "variantIdsArr",
      "foreignField": "_id",
      "as": "availableVariants"
    }
  },
  {
    "$lookup": {
      "from": "brands",
      "localField": "brandId",
      "foreignField": "_id",
      "as": "brand"
    }
  },
  {
    "$lookup": {
      "from": "dimensions",
      "localField": "productTags",
      "foreignField": "dimension._id",
      "as": "dimensions"
    }
  },
  {
    "$lookup": {
      "from": "categoryones",
      "localField": "categoryOneId",
      "foreignField": "_id",
      "as": "catOne"
    }
  },
  {
    "$lookup": {
      "from": "categorytwos",
      "localField": "categoryTwoId",
      "foreignField": "_id",
      "as": "catTwo"
    }
  },
  {
    "$lookup": {
      "from": "categorythrees",
      "localField": "categoryThreeId",
      "foreignField": "_id",
      "as": "catThree"
    }
  },
  {
    "$lookup": {
      "from": "shops",
      "localField": "shopId",
      "foreignField": "_id",
      "as": "shop"
    }
  },
  {
    "$lookup": {
      "from": "users",
      "localField": "createdBy",
      "foreignField": "_id",
      "as": "created"
    }
  },
  {
    "$lookup": {
      "from": "ratings",
      "localField": "_id",
      "foreignField": "productId",
      "as": "ratings"
    }
  },
  {
    "$lookup": {
      "from": "carts",
      "as": "cartsData",
      "let": {
        "productId": "$_id"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$eq": [
                    "$productId",
                    ObjectId("643fcdc51e9fad05ab88bca5")
                  ]
                },
                {
                  "$eq": [
                    "$createdBy",
                    ObjectId("64411a6d3de27725deb984ba")
                  ]
                }
              ]
            }
          }
        }
      ]
    }
  },
  {
    "$lookup": {
      "from": "productcountschemas",
      "as": "selectedItemCount",
      "let": {
        "productId": "$_id"
      },
      "pipeline": [
        {
          "$match": {
            "$expr": {
              "$and": [
                {
                  "$eq": [
                    "$productId",
                    ObjectId("643fcdc51e9fad05ab88bca5")
                  ]
                },
                {
                  "$eq": [
                    "$createdBy",
                    ObjectId("64411a6d3de27725deb984bb")
                  ]
                }
              ]
            }
          }
        }
      ]
    }
  },
  {
    "$project": {
      "_id": 1,
      "geoLocation": 1,
      "productColor": 1,
      "productPriceUnit": 1,
      "productMaterial": 1,
      "productSleeveType": 1,
      "productPatternType": 1,
      "productCareType": 1,
      "dressStyle": 1,
      "quantity": 1,
      "isProductInStock": 1,
      "isProductVariationExists": 1,
      "stockAvailability": 1,
      "productImages": 1,
      "globalTradeItemNumber": 1,
      "launchDate": 1,
      "productBrief": 1,
      "productDescription": 1,
      "productLength": 1,
      "productLengthUnit": 1,
      "productNeckStyle": 1,
      "productPrice": 1,
      "productSize": 1,
      "productSizeIndicator": 1,
      "productTitle": 1,
      "slug": 1,
      "targetGender": 1,
      "brand._id": 1,
      "brand.brandName": 1,
      "catOne._id": 1,
      "catOne.categoryName": 1,
      "catTwo._id": 1,
      "catTwo.categoryName": 1,
      "catThree._id": 1,
      "catThree.categoryName": 1,
      "shop._id": 1,
      "shop.shopName": 1,
      "created._id": 1,
      "created.companyName": 1,
      "packageDimensions": 1,
      "productWeight": 1,
      "created.name": 1,
      "dimensions.dimension": 1,
      "ratings._id": 1,
      "ratings.rating": 1,
      "bookings": 1,
      "availableVariants._id": 1,
      "availableVariants.productColor": 1,
      "availableVariants.productSizeIndicator": 1,
      "rate": {
        "$cond": {
          "if": {
            "$eq": [
              {
                "$avg": "$ratings.rating"
              },
              null
            ]
          },
          "then": 0,
          "else": {
            "$avg": "$ratings.rating"
          }
        }
      },
      "ratedByPeople": {
        "$size": "$ratings"
      },
      "selectedItemCount": {
        "$slice": [
          "$selectedItemCount.itemCount",
          1
        ]
      },
      "isDataInCart": {
        "$cond": {
          "if": {
            "$eq": [
              {
                "$size": "$cartsData"
              },
              1
            ]
          },
          "then": true,
          "else": false
        }
      }
    }
  }
])
