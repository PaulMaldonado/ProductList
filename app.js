// Creando clase TodoList

class ProductList {
    constructor(name) {
        this.name = name;
    }
}


// Creando clase para interactuar con el DOM

class ProductUi {

    createProduct() {
        const name = document.getElementById('name').value;

        const productData = {
            name: name
        }

        if(localStorage.getItem('product') === null) {
            let product = [];
            product.push(productData);
            localStorage.setItem('product', JSON.stringify(product));
        }else {
            let product = JSON.parse(localStorage.getItem('product'));
            product.push(productData);
            localStorage.setItem('product', JSON.stringify(product));
        }

    }

    showProduct() {
        let product = JSON.parse(localStorage.getItem('product'));
        const list_ui = document.getElementById('list-ui');
        const element = document.createElement('div');


            for(let item of product) {
                element.innerHTML = `
                    <div class="card border-primary mb-3" style="max-width: 50rem;">
                        <div class="card-header">
                            <h3>Producto</h3>
                        </div>
                        <div class="card-body">
                            <p><strong>Producto: </strong>${item.name}</p>
                            <br><br>

                            <a href="#" class="btn btn-danger" name="delete">Eliminar</a>
                            <a href="#" class="btn btn-info" name="edit">Editar</a>
                        </div>
                    </div>  

                `;
            }

            list_ui.appendChild(element);
    }


    deleteProduct(element) {
        let product = JSON.parse(localStorage.getItem('product'));

        if(element.name == 'delete') {
            element.parentElement.parentElement.remove();
            this.showingMessages('Producto eliminado correctamente!', 'danger');
        }
    }


    resetForm() {
        const reset_form = document.getElementById('form-list');

        reset_form.reset();
    }


    showingMessages(message, cssAlert) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssAlert} mt-3`;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const app_message = document.getElementById('app-message');

        container.insertBefore(div, app_message);

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    
}


// Accediendo al DOM

document.getElementById('form-list').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value;
    const product_List = new ProductList(name);
    const product_ui = new ProductUi();

    if(name === '') {
        product_ui.showingMessages('Los campos del formulario no pueden estar en blanco, intente de nuevo!');
    }
    
    product_ui.createProduct(product_List);
    product_ui.showProduct(product_List);
    product_ui.resetForm();
    product_ui.showingMessages('Producto creado exitosamente!', 'success');


    const delete_element = document.getElementById('list-ui');
    delete_element.addEventListener('click', function(event) {
        const product_ui = new ProductUi();
        product_ui.deleteProduct(event.target);

        event.preventDefault();
    });


    event.preventDefault();
});