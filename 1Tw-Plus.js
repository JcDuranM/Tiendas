function cart() {
    var cartHTML = `
        <fieldset>
            <input type="text" name="name" placeholder="${$_config.text.checkout_name}" required>
            <input type="tel" name="phone" placeholder="${$_config.text.checkout_phone}" required>
        </fieldset>
    `;

    if ($_config.checkout_form.email) {
        cartHTML += `
            <input type="email" name="email" placeholder="${$_config.text.checkout_email}" required>
        `;
    }
    if ($_config.checkout_form.address) {
        cartHTML += `
            <textarea name="address" placeholder="${$_config.text.checkout_address}" required></textarea>
        `;
    }
    if ($_config.checkout_form.note) {
        cartHTML += `
            <textarea name="note" placeholder="${$_config.text.checkout_note}"></textarea>
        `;
    }
    if ($_config.checkout_form.shipping) {
        cartHTML += `
            <select name="shipping" required>
                <option value="" selected hidden>${$_config.text.checkout_shipping}</option>
                <optgroup label="${$_config.text.checkout_shipping} :">
        `;
        for (var key in $_config.checkout_form_shipping) {
            var option = $_config.checkout_form_shipping[key];
            if (option.status) {
                $("<img src=\"" + option.img + "\"/>").on("load", function() {});
                cartHTML += `
                    <option value="${key}" data-info="${option.info}" data-img="${option.img}">
                        ${key}
                    </option>
                `;
            }
        }
        cartHTML += `</optgroup></select>`;
    }
    if ($_config.checkout_form.payment) {
        $("#contact").append(`<p class="shippay"><b>${$_config.text.checkout_payment} :</b></p>`);
        cartHTML += `
            <select name="payment" required>
                <option value="" selected hidden>${$_config.text.checkout_payment}</option>
                <optgroup label="${$_config.text.checkout_payment} :">
        `;
        for (var key in $_config.checkout_form_payment) {
            var option = $_config.checkout_form_payment[key];
            if (option.status) {
                $("#contact .shippay").append(`<figure><img alt="${key}" src="${option.img}" width="24" height="24"/><figcaption>${key}</figcaption></figure>`);
                $("<img src=\"" + option.img + "\"/>").on("load", function() {});
                cartHTML += `
                    <option value="${key}" data-info="${option.info}" data-img="${option.img}">
                        ${key}
                    </option>
                `;
            }
        }
        cartHTML += `</optgroup></select>`;
    }
    $("#cart .form").append(cartHTML);
    $("#cart .form").on("change", 'select', function() {
        var selected = $(this);
        var value = selected.val();
        var option = $("option:selected", selected);
        var info = option.attr('data-info');
        var imgSrc = option.attr("data-img");
        selected.prev(".detail").remove();
        $("<img src=\"" + imgSrc + "\"/>").on('load', function() {
            $(`
                <div class="detail">
                    <img src="${imgSrc}">
                    <h4>${value}</h4>
                    <p>${info}</p>
                </div>
            `).insertBefore(selected).hide().fadeIn();
        });
    });
    $("#cart .form").on("click", ".detail", function() {
        $(this).next("select").focus();
    });
}
