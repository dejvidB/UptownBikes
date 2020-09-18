$(document).ready(function () {
    // Add to cart functionality
    if (sessionStorage.getItem('cart') == null) {
        var cart_counter = 0;
    } else {
        var cart_counter = sessionStorage.getItem('cart');
    }

    $(".cart").text(cart_counter);

    $("#add_to_cart").click(function () {
        add_to_cart();
    });

    $(".item .btn").click(function (e) {
        e.stopPropagation();
        add_to_cart();
    });

    function add_to_cart() {
        cart_counter++;
        sessionStorage.setItem('cart', cart_counter);
        $(".cart").text(cart_counter);
        $(".cart").parent().css("opacity", "1");
        $(".cart").parent().css("color", "yellow");

        setTimeout(function () {
            $(".cart").parent().css("color", "white");
            $(".cart").parent().css("opacity", "0.8");
        }, 500);
    }

    // Go to top functionality
    $("#go_to_top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 'slow');
    });

    window.addEventListener('scroll', function scrollFunction() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            document.getElementById("go_to_top").style.display = "block";
        } else {
            document.getElementById("go_to_top").style.display = "none";
        }
    });

    // Cookies
    if (sessionStorage.getItem('cookies') == null) {
        $(".cookies").show();
    }

    $('.accept').click(function (e) {
        e.preventDefault();
        sessionStorage.setItem('cookies', 1);
        $(".cookies").hide();
    });

    // Product click
    $(".item").click(function () {
        var title = $(this).attr("title");
        var img = $(this).find(".product-body").children("img").attr("src");
        var price = $(this).attr("alt-price");
        var id = $(this).children(".product").attr("id");
        $(".product_view .modal-title").text(title);
        $(".product_view .product_img > img").attr("src", img);
        $(".product_view .cost").text("$" + price);
        $(".product_view .product_id").text("Product id: " + id);
        $(".product_view").modal("show");
    });

    // TradingView widget
    new TradingView.widget(
        {
            "autosize": true,
            "symbol": "AMEX:SPY",
            "timezone": "Etc/UTC",
            "theme": "light",
            "style": "3",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_top_toolbar": true,
            "hide_legend": true,
            "range": "1m",
            "save_image": false,
            "container_id": "tradingview_d7abe"
        }
    );
});

// Price range functionality
(function () {
    'use strict';
    var products = document.getElementById("products").children;
    var init = function () {
        var slider2 = new rSlider({
            target: '#price_range',
            values: ["$100", "300", "500", "700", "900", "1100", "1300", "1500", "1700", "1900", "$2000"],
            step: 1,
            range: true,
            set: ["$100", "$2000"],
            tooltip: true,
            scale: false,
            labels: true,
            width: null,
            onChange: function (vals) {
                var values = vals.split(",");
                var min_price = parseFloat(values[0].replace("$", ""));
                var max_price = parseFloat(values[1].replace("$", ""));
                var counter = 0;
                var i;
                for (i = 0; i < products.length; i++) {
                    var price = parseFloat(products[i].getAttribute("alt-price"));
                    if (price >= min_price && price <= max_price) {
                        counter++;
                        products[i].style.display = "block";
                    } else {
                        products[i].style.display = "none";
                    }
                }

                $("#results").text(counter + " bicycles were found.");
            }
        });
    };
    window.onload = init;
})();