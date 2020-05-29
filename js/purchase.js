const firebaseConfig = {
    apiKey: "AIzaSyCCiNyYhoTM-8JDFoQnM_R7FfDIg61g6dQ",
    authDomain: "purchase-box.firebaseapp.com",
    databaseURL: "https://purchase-box.firebaseio.com",
    projectId: "purchase-box",
    storageBucket: "purchase-box.appspot.com",
  };
  firebase.initializeApp(firebaseConfig);


$(function(){
    const databese = firebase.database();
    const selection = databese.ref('selection/');
    const orders = databese.ref('orders/');

    /* --------------------------------
    * Notification
    * -------------------------------- */
    const Notification = (message) =>{
        if(message == 'fill-all'){
            $('.fill-all').fadeIn(1000);
        
            setTimeout(function(){
                $('.fill-all').fadeOut(1000);
            },3500);
        }
    
        if(message == 'inserted successfully'){
            $('.inserted').fadeIn(1000);
        
            setTimeout(function(){
                $('.inserted').fadeOut(1000);
            },3500);
        }

        if(message == 'updated'){
            $('.updated').fadeIn(1000);
        
            setTimeout(function(){
                $('.updated').fadeOut(1000);
            },3500);
        }
    }

    /* --------------------------------
    * Add Product
    * -------------------------------- */
    $('[name=submit]').click(function(e){
        e.preventDefault();

        const category = $('[name=category').val(),
            //   title = $('[name=title').val(),
                  size = $('[name=size').val(),
             capacitance = $('[name=capacitance').val(),
               voltage = $('[name=voltage').val(),
                 price = $('[name=price').val(),
                 image = $('[name=image').val().slice(12),
                 newId = selection.push();
   
        if(!size ||!capacitance ||!voltage || !price || !image){
            Notification('fill-all');
        } else {
            newId.set({
                category : category,
                //    title : title,
                    size : size,
               capacitance : capacitance,
                 voltage : voltage,
                   price : price,
                   image : "img/"+image
            },
            function(error){
                if(!error){
                    Notification("inserted successfully");
                    // $('[name=title').val("")
                    $('[name=size').val("")
                    $('[name=capacitance').val("")
                    $('[name=voltage').val("")
                    $('[name=price').val("")
                    $('[name=image').val("")
                } else {
                    console.log("Not saved");
                }
            });
        }
    });

    /* --------------------------------
    * Select Products
    * -------------------------------- */
    selection.on('value', function success(data){
       if(data){
           let first = "",
               second = "",
               third = "";
        
            $.each(data.val(),function(key, value){
                let id = key,
                category = value['category'],
                   size = value['size'],
                   capacitance = value['capacitance'],
                   voltage = value['voltage'],
                   price = value['price'],
                   image = value['image'];

                if(category == 'first'){                   
                    first += `<div class="product-box">
                                <div id= "${key}">
                                    <div class="image"><img src="${image}"></div>
                                    <div class="category">${category}</div>
                                    <div class="size">直径 : ${size}[mm]</div>                                 
                                    <div class="capacitance">静電容量 : ${capacitance}[μF]</div>                                 
                                    <div class="voltage">定格電圧 : ${voltage}[V]</div>                                   
                                    <div class="price">価格 : ${price}円</div>                                                              
                                    <div class="add-to-cart cart-icon" data-id="${key}"><i class="fas fa-cart-plus"></i></div>
                                </div>
                            </div>`;
                            
                } 
                else if(category == 'second')
                {                   
                    second += `<div class="product-box">
                                <div id= "${key}">
                                    <div class="image"><img src="${image}"></div>
                                    <div class="category">${category}</div>
                                    <div class="size">サイズ規格 : ${size}</div>                                 
                                    <div class="capacitance">静電容量 : ${capacitance}[μF]</div>                                 
                                    <div class="voltage">定格電圧 : ${voltage}[V]</div>                                   
                                    <div class="price">価格 : ${price}円</div>                                   
                                    <div class="add-to-cart cart-icon" data-id="${key}"><i class="fas fa-cart-plus"></i></div>
                                </div>
                            </div>`;
                } 
                else if(category == 'third')
                {                   
                    third += `<div class="product-box">
                                <div id= "${key}">
                                    <div class="image"><img src="${image}"></div>
                                    <div class="category">${category}</div>
                                    <div class="size">直径 : ${size}[mm]</div>                                 
                                    <div class="capacitance">公称容量 : ${capacitance}[mAh]</div>                                 
                                    <div class="voltage">公称電圧 : ${voltage}[V]</div>                                   
                                    <div class="price">価格 : ${price}円</div>                                    
                                    <div class="add-to-cart cart-icon" data-id="${key}"><i class="fas fa-cart-plus"></i></div>
                                </div>
                            </div>`;
                }
            });

            $('.first').html(first);
            $('.second').html(second);
            $('.third').html(third);

            /* --------------------------------
            * Add To Cart
            * -------------------------------- */
            $('.add-to-cart').click(function(){

                let thekey = $(this).data('id'),
                category = $(`#${thekey} > .category`).text(),
                      size = $(`#${thekey} > .size`).text(),
                 capacitance = $(`#${thekey} > .capacitance`).text(),
                   voltage = $(`#${thekey} > .voltage`).text(),
                     price = $(`#${thekey} > .price`).text();

                if(category == 'first'){
                    let appenddata = `<div class="cart-detail">
                                        <div class="cart-category">アルミ電解コンデンサ</div>
                                        <div class="cart-size">${size}</div>
                                        <div class="cart-capacitance">${capacitance}</div>
                                        <div class="cart-voltage">${voltage}</div>
                                        <div class="cart-price">${price}</div>
                                        <div class="cart-remove">×</div>
                                      </div>`;
                    $('.cart').append(appenddata);

                }else if (category == 'second'){
                    let appenddata = `<div class="cart-detail">
                                        <div class="cart-category">積層セラミックコンデンサ</div>
                                        <div class="cart-size">${size}</div>
                                        <div class="cart-capacitance">${capacitance}</div>
                                        <div class="cart-voltage">${voltage}</div>
                                        <div class="cart-price">${price}</div>
                                        <div class="cart-remove">×</div>
                                    </div>`;
                    $('.cart').append(appenddata);

                }else if (category == 'third'){
                    let appenddata = `<div class="cart-detail">
                                        <div class="cart-category">リチウム電池</div>
                                        <div class="cart-size">${size}</div>
                                        <div class="cart-capacitance">${capacitance}</div>
                                        <div class="cart-voltage">${voltage}</div>
                                        <div class="cart-price">${price}</div>
                                        <div class="cart-remove">×</div>
                                    </div>`;
                    $('.cart').append(appenddata);
                };
                console.log(category);
            });

            $('.cart-toggle').click(function(){

                $('#header').slideToggle();
                $('.cart-container').slideToggle();
            });

            $(document).on('click', '.cart-remove', function(){

                $(this).parent().remove();
            
            });

            $(document).on('click', '.cart-remove, .cart-icon', function(){

                total();

                let totalrows = $('.cart-price').length,
                  itemcounter = $('.totalitems');

                   itemcounter.fadeOut(500, function(){
                    $(this).html(totalrows).fadeIn(500);
                   })
            });
       
            /* --------------------------------
            * Calculate Total
            * -------------------------------- */
            const total = () =>{
                let allcartproducts = $('.cart-price'),
                          total = 0;
                    
                    for(let i=0; i < allcartproducts.length; i++){
                        var getprice = $('.cart-price').eq(i).text();
                        getpriceNumber = getprice.replace(/[^0-9]/g, '');
                        total += parseInt(getpriceNumber);
                    }

                $('.total').text(`合計金額 : ${total}円`);

                if(total > 1){
                    $('.send-order').slideDown();
                } else{
                    $('.send-order').slideUp();
                };
                return total;
            };

            /* --------------------------------
            * Sent order to Databese
            * -------------------------------- */

            $(document).on('click', '.send-order', function(){

                var ordereditems =[];
                let totalrows = $('.cart-price').length;

                for(let i = 0; i < totalrows; i++){
                    var items = 
                    {
                             size : $('.cart-size').eq(i).text(),
                        capacitance : $('.cart-capacitance').eq(i).text(),
                          voltage : $('.cart-voltage').eq(i).text(),
                            price : $('.cart-price').eq(i).text(),
                    }

                    ordereditems.push(items);
                }

                let newid = orders.push();
                    newid.set({
                        products : ordereditems,
                           total : total(),
                            name : $('[name=name]').val(),
                            mail : $('[name=email]').val(),
                            tell : $('[name=tell]').val(),
                         company : $('[name=company]').val(),
                      department : $('[name=department]').val()
                    },

                    function(error){

                        if(!error){
                            $('[name=name]').val("")
                            $('[name=email]').val("")
                            $('[name=tell]').val("")
                            $('[name=company]').val("")
                            $('[name=department]').val("")
                            $('.cart-remove').click();
                            $('.cart').append('<tr class="announcement"><td colspan="3">Order Sent Successfully</td></tr>');
                            setTimeout(function(){
                                $('.cart-toggle').click();
                                $('.announcement').remove();
                            },2500);
                        }
                    }
                );
            });
        }else{
            console.log('No data found');
        }
   });
});