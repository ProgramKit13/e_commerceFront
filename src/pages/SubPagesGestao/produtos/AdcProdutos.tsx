import { Card, Container, Row, Form, Col, Button } from "react-bootstrap";
import { ThemeContext } from "../../../assets/components/NavBar/controls/controlTheme/SwitchContext";
import { useContext, forwardRef, useState, useEffect } from "react";
import { NumericFormat } from 'react-number-format';
import { getErrorMessage, validateQuantity, validateTextofDescription, valueInput, validateDiferentText, validateBarCode, validateDimensions, valueInputRequired, validateSupplierCode, validateWeight } from "../../../assets/validators/validator";
import { api } from "../../../api/admin/api_admin_products";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from '../../../redux/store';
import { fetchSelectAllSector } from "../../../redux/reducers/sectorsReducer";



const CustomInput = forwardRef((props, ref) => <Form.Control {...props}  />);

export const AdcProdutos: React.FC = (props) => {
    const category = useSelector((state: RootState) => state.sectors);
    const dispatch = useDispatch<AppDispatch>();
    const { isTheme } = useContext(ThemeContext);
    const [addName, setAddName] = useState('');
    const [addResaleValue, setAddResaleValue] = useState('');
    const [addCust, setAddCust] = useState('');
    const [addTax, setAddTax] = useState('');
    const [addDiscount, setAddDiscount] = useState('');
    const [addQuantity, setAddQuantity] = useState('');
    const [addSupplier, setAddSupplier] = useState('');
    const [addSupplierCode, setAddSupplierCode] = useState('');
    const [addDescription, setAddDescription] = useState('');
    const [addDatePurchase, setAddDatePurchase] = useState(''); 
    const [addManufacturer, setAddManufacturer] = useState(''); 
    const [addWeight, setAddWeight] = useState(''); 
    const [addWeightUnit, setAddWeightUnit] = useState(''); 
    const [addDimensions, setAddDimensios] = useState('');
    const [addDimeniosnUnit, setAddDimenionsUnit] = useState('');  
    const [addBarCode, setAddBarCode] = useState(''); 
    const [addLastUpdate, setAddLastUpdate] = useState(''); 
    const [addReorderPoint, setAddReorderPoint] = useState('');
    const [addRestockTime, setAddRestockTime] = useState('');
    const [addWarrantyInfo, setAddWarrantyInfo] = useState(''); 
    const [addBatchInfo, setAddBatchInfo] = useState('');
    const [addExpireDate, setAddExpireDate] = useState('');
    const [addMaterialOrIngredients, setAddMaterialOrIngredients] = useState(''); 
    const [addSafetyRating, setAddSafetyRating] = useState('');
    const [addShippingRestrictions, setAddShippingRestrictions] = useState(''); 
    const [addSector, setAddSector] = useState('');  
    const [addNewSetorClicked, setAddNewSetorClicked] = useState(false)
    const [errorAddName, setErrorAddName] = useState('');
    const [errorAddResaleValue, setErrorAddResaleValue] = useState('');
    const [errorAddCust, setErrorAddCust] = useState('');
    const [errorAddTax, setErrorAddTax] = useState('');
    const [errorAddDiscount, setErrorAddDiscount] = useState('');
    const [errorAddQuantity, setErrorAddQuantity] = useState('');
    const [errorAddSupplier, setErrorAddSupplier] = useState('');
    const [errorAddSupplierCode, setErrorAddSupplierCode] = useState('');
    const [errorAddDescription, setErrorAddDescription] = useState('');
    const [errorAddDatePurchase, setErrorAddDatePurchase] = useState('');
    const [errorAddManufacturer, setErrorAddManufacturer] = useState('');
    const [errorAddWeight, setErrorAddWeight] = useState('');
    const [errorAddWeightUnit, setErrorAddWeightUnit] = useState('');
    const [errorAddDimensions, setErrorAddDimensions] = useState('');
    const [errorAddDimenionsUnit, setErrorAddDimenionsUnit] = useState('');
    const [errorAddBarCode, setErrorAddBarCode] = useState('');
    const [errorAddLastUpdate, setErrorAddLastUpdate] = useState();
    const [errorAddReorderPoint, setErrorAddReorderPoint] = useState('');
    const [errorAddRestockTime, setErrorAddRestockTime] = useState('');
    const [errorAddWarrantyInfo, setErrorAddWarrantyInfo] = useState('');
    const [errorAddBatchInfo, setErrorAddBatchInfo] = useState('');
    const [errorAddExpireDate, setErrorAddExpireDate] = useState('');
    const [errorAddMaterialOrIngredients, setErrorAddMaterialOrIngredients] = useState('');
    const [errorAddSafetyRating, setErrorAddSafetyRating] = useState('');
    const [errorAddShippingRestrictions, setErrorAddShippingRestrictions] = useState('');
    const [errorAddSector, setErrorAddSector] = useState('');


    useEffect(() => {
      dispatch(fetchSelectAllSector());
    }, [dispatch]);
    

    const handleAddNewSetorClick = () => {
      setAddNewSetorClicked(!addNewSetorClicked);
    };

    const handleAddName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddName(event.target.value);
      };
    
      const handleAddResaleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddResaleValue(event.target.value);
      };

      const handleAddSector = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddSector(event.target.value);
        };
    
      const handleAddCust = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddCust(event.target.value);
      };
    
      const handleAddTax = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddTax(event.target.value);
      };
    
      const handleAddDiscount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddDiscount(event.target.value);
      };
    
      const handleAddQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        const inputValue = input.value.replace(/\D/g, ''); 
        input.value = inputValue; 
        setAddQuantity(inputValue);
      };
    
      const handleAddSupplier = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddSupplier(event.target.value);
      };

        const handleAddSupplierCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddSupplierCode(event.target.value);
        };
    
      const handleAddDatePurchase = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddDatePurchase(event.target.value);
      };
    
      const handleAddDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddDescription(event.target.value);
      };

        const handleAddManufacturer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddManufacturer(event.target.value);
        };

        const handleAddWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
          const input = event.target as HTMLInputElement;
          let inputValue = input.value;
        
          // Remove todos os caracteres que não são dígitos
          inputValue = inputValue.replace(/[^\d]/g, '');
        
          // Divide o valor em parte inteira e decimal
          const integerPart = inputValue.slice(0, -2);
          const decimalPart = inputValue.slice(-2);
        
          // Verifica se o valor está vazio
          if (inputValue === '') {
            setAddWeight('');
          } else {
            // Formata o valor adicionando o ponto decimal
            const formattedValue = `${integerPart}.${decimalPart}`;
        
            // Atualiza o estado com o valor formatado
            setAddWeight(formattedValue);
          }
        };

        const handleAddWeightUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddWeightUnit(event.target.value);
        };

        const handleAddDimensions = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddDimensios(event.target.value);
        };

        const handleAddDimenionsUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddDimenionsUnit(event.target.value);
        };

        const handleAddBarCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddBarCode(event.target.value);
        };

        const handleAddLastUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
          setAddLastUpdate(event.target.value);
        };

        const handleAddReorderPoint = (event: React.ChangeEvent<HTMLInputElement>) => {
          const input = event.target as HTMLInputElement;
          const inputValue = input.value.replace(/\D/g, ''); 
          input.value = inputValue; 
          setAddReorderPoint(inputValue);
        };

        const handleAddRestockTime = (event: React.ChangeEvent<HTMLInputElement>) => {
          const input = event.target as HTMLInputElement;
          const inputValue = input.value.replace(/\D/g, ''); 
          input.value = inputValue; 
          setAddRestockTime(inputValue);
        };

        const handleAddWarrantyInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddWarrantyInfo(event.target.value);
        };

        const handleAddBatchInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddBatchInfo(event.target.value);
        };

        const handleAddExpireDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddExpireDate(event.target.value);
        };

        const handleAddMaterialOrIngredients = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddMaterialOrIngredients(event.target.value);
        };

        const handleAddSafetyRating = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddSafetyRating(event.target.value);
        };

        const handleAddShippingRestrictions = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddShippingRestrictions(event.target.value);
        };

        
        const handleSave = async () => {
            const productName = document.getElementById('productName') as HTMLInputElement;
            const productPrice = document.getElementById('productResaleValue') as HTMLInputElement;
            const productCust = document.getElementById('productCust') as HTMLInputElement;
            const productTax = document.getElementById('productTax') as HTMLInputElement;
            const productDiscount = document.getElementById('productDiscount') as HTMLInputElement;
            const productQuantity = document.getElementById('productQuantity') as HTMLInputElement;
            const productSupplier = document.getElementById('productSupplier') as HTMLInputElement;
            const productSupplierCode = document.getElementById('productSupplierCode') as HTMLInputElement;
            const productDescription = document.getElementById('productDescription') as HTMLInputElement;
            const productDatePurchase = document.getElementById('productDatePurchase') as HTMLInputElement;
            const productSectorSelect = document.getElementById('setorSelect') as HTMLInputElement;
            const productManufacturer = document.getElementById('productManufacturer') as HTMLInputElement;
            const productWeight = document.getElementById('productWeight') as HTMLInputElement;
            const productWeightUnit = document.getElementById('productWeightUnit') as HTMLInputElement;
            const productDimensions = document.getElementById('productDimensions') as HTMLInputElement;
            const productDimensionsUnit = document.getElementById('productDimensionsUnit') as HTMLInputElement;
            const productBarCode = document.getElementById('productBarCode') as HTMLInputElement;
            const productLastUpdate = document.getElementById('productLastUpdate') as HTMLInputElement;
            const productReorderPoint = document.getElementById('productReorderPoint') as HTMLInputElement;
            const productRestockTime = document.getElementById('productRestockTime') as HTMLInputElement;
            const productWarrantyInfo = document.getElementById('productWarrantyInfo') as HTMLInputElement;
            const productBatchInfo = document.getElementById('productBatchInfo') as HTMLInputElement;
            const productExpireDate = document.getElementById('productExpireDate') as HTMLInputElement;
            const productMaterialOrIngredients = document.getElementById('productMaterialOrIngredients') as HTMLInputElement;
            const productSafetyRating = document.getElementById('productSafetyRating') as HTMLInputElement;
            const productShippingRestrictions = document.getElementById('productShippingRestrictions') as HTMLInputElement;

           
            const verifyProductName = validateDiferentText(productName.value, true, false);
            let nameProductError = '';
          
            if (typeof verifyProductName === 'object' && Object.keys(verifyProductName).length > 0) {
                nameProductError = getErrorMessage(verifyProductName);
                setErrorAddName(nameProductError);
            } else {
                setErrorAddName('');
            }
          
          
            const verifyProductPrice = valueInputRequired(productPrice.value);
            let priceProductError = '';
            
            if (typeof verifyProductPrice === 'object' && Object.keys(verifyProductPrice).length > 0) {
                priceProductError = getErrorMessage(verifyProductPrice);
                setErrorAddResaleValue(priceProductError);
            } else {
              setErrorAddResaleValue('');
            }


            const verifyProductCust = valueInputRequired(productCust.value);
            let costProductError = '';
          
            if (typeof verifyProductCust === 'object' && Object.keys(verifyProductCust).length > 0) {
                costProductError = getErrorMessage(verifyProductCust);
                setErrorAddCust(costProductError);
            } else {
                setErrorAddCust('');
            }
          

            let taxProductError = '';
            if (addTax !== '') {
              const verifyProductTax = valueInput(productTax.value);           
              if (verifyProductTax === false) {
                taxProductError = 'Valor inválido';
                setErrorAddTax(taxProductError)
              } else {
                  setErrorAddTax('');
              }
            } else {
              setErrorAddTax('');
            }
                     
          
            
            let discountProductError = '';
            if (addDiscount !== '') {
              const verifyProductDiscount = valueInput(productDiscount.value);         
              if (verifyProductDiscount === false) {
                  discountProductError = 'Valor inválido';
                  setErrorAddDiscount(discountProductError)
              } else {
                  setErrorAddDiscount('');
              }
            } else {
              setErrorAddDiscount('');
            }


            let supplierCodeError = '';
            if (addSupplier !== '') {
              const verifySupplierCode = validateSupplierCode(productSupplierCode.value);
              if (typeof verifySupplierCode === 'object' && Object.keys(verifySupplierCode).length > 0) {
                  supplierCodeError = getErrorMessage(verifySupplierCode);
                  setErrorAddSupplierCode(supplierCodeError);
              } else {
                  setErrorAddSupplierCode('');
              }
            } else {
              setErrorAddSupplierCode('');  
            }
          
            
            const verifyProductQuantity = validateQuantity(Number(productQuantity.value));
            let quantityProductError = '';
            if (typeof verifyProductQuantity === 'object' && Object.keys(verifyProductQuantity).length > 0) {
                quantityProductError = getErrorMessage(verifyProductQuantity);
                setErrorAddQuantity(quantityProductError);
            } else {
                setErrorAddQuantity('');
            }
            
          


            let supplierProductError = '';
            if (addSupplier !== '') { 
              const verifyProductSupplier = validateDiferentText(addSupplier, false, true);
              if (typeof verifyProductSupplier === 'object' && Object.keys(verifyProductSupplier).length > 0) {
                supplierProductError = getErrorMessage(verifyProductSupplier);
                setErrorAddSupplier(supplierProductError)
              } else {
                  setErrorAddSupplier('');
              }
            } else {
              setErrorAddSupplier('');
            }


        
            const verifyProductSector = validateDiferentText(productSectorSelect.value, true, true);
            let supplierSectortError = '';         
            if (typeof verifyProductSector === 'object' && Object.keys(verifyProductSector).length > 0) {
              supplierSectortError = getErrorMessage(verifyProductSector);
                setErrorAddSector(supplierSectortError)
            } else {
                setErrorAddSector('');
            }
          
            
            let descriptionProductError = '';
            if (addDescription !== '') {
              const verifyProductDescription = validateTextofDescription(productDescription.value);
              if (typeof verifyProductDescription === 'object' && Object.keys(verifyProductDescription).length > 0) {
                  descriptionProductError = getErrorMessage(verifyProductDescription);
                  setErrorAddDescription(descriptionProductError)
              } else {
                  setErrorAddDescription('');
              }
            } else {
              setErrorAddDescription('');
            }
          
            
            let manufacturerProductError = '';
            if (addManufacturer !== '') {
              const verifyProductManufacturer = validateDiferentText(productManufacturer.value, false, false);
              if (typeof verifyProductManufacturer === 'object' && Object.keys(verifyProductManufacturer).length > 0) {
                  manufacturerProductError = getErrorMessage(verifyProductManufacturer);
                  setErrorAddManufacturer(manufacturerProductError)
              } else {
                  setErrorAddManufacturer('');
              }
            } else {
              setErrorAddManufacturer('');
            }


            let weightProductError = '';
            if (addWeight !== '') {
              const verifyProductWeight = validateWeight(productWeight.value);
              if (typeof verifyProductWeight === 'object' && Object.keys(verifyProductWeight).length > 0) {
                  weightProductError = getErrorMessage(verifyProductWeight);
                  setErrorAddWeight(weightProductError)
              } else {
                  setErrorAddWeight('');
              }
            } else {
              setErrorAddWeight('');
            }
           
            let dimensionsProductError = '';
            if (addDimensions !== '') {
              const verifyProductDimensions = validateDimensions(productDimensions.value);
              if (typeof verifyProductDimensions === 'object' && Object.keys(verifyProductDimensions).length > 0) {
                  dimensionsProductError = getErrorMessage(verifyProductDimensions);
                  setErrorAddDimensions(dimensionsProductError)
              } else {
                  setErrorAddDimensions('');
              }
            } else {
              setErrorAddDimensions('');
            }

            

            let barCodeProductError = '';
            if (addBarCode !== '') {
              const verifyProductBarCode = validateBarCode(productBarCode.value);
              if (typeof verifyProductBarCode === 'object' && Object.keys(verifyProductBarCode).length > 0) {
                  barCodeProductError = getErrorMessage(verifyProductBarCode);
                  setErrorAddBarCode(barCodeProductError)
              } else {
                  setErrorAddBarCode('');
              }
            } else {
              setErrorAddBarCode('');
            }
           
            
            let reorderPointProductError = '';
            if (addReorderPoint !== '') {
            const verifyProductReorderPoint = validateQuantity(Number(productReorderPoint.value));
            if (typeof verifyProductReorderPoint === 'object' && Object.keys(verifyProductReorderPoint).length > 0) {
                reorderPointProductError = getErrorMessage(verifyProductReorderPoint);
                setErrorAddReorderPoint(reorderPointProductError)
            } else {
                setErrorAddReorderPoint('');
            }
            } else {
              setErrorAddReorderPoint('');
            }



            let restockTimeProductError = '';
            if (addRestockTime !== '') {
              const verifyProductRestockTime = validateQuantity(Number(productRestockTime.value));
              if (typeof verifyProductRestockTime === 'object' && Object.keys(verifyProductRestockTime).length > 0) {
                  restockTimeProductError = getErrorMessage(verifyProductRestockTime);
                  setErrorAddRestockTime(restockTimeProductError)
              } else {
                  setErrorAddRestockTime('');
              }
            } else {
              setErrorAddRestockTime('');
            }



            let warrantyInfoProductError = '';
            if (addWarrantyInfo !== '') {
              const verifyProductWarrantyInfo = validateDiferentText(productWarrantyInfo.value, false, true);
              if (typeof verifyProductWarrantyInfo === 'object' && Object.keys(verifyProductWarrantyInfo).length > 0) {
                  warrantyInfoProductError = getErrorMessage(verifyProductWarrantyInfo);
                  setErrorAddWarrantyInfo(warrantyInfoProductError)
              } else {
                  setErrorAddWarrantyInfo('');
              }
            }
            else {
              setErrorAddWarrantyInfo('');
            }


            let batchInfoProductError = '';
              if (addBatchInfo !== '') {
              const verifyProductBatchInfo = validateDiferentText(productBatchInfo.value, false, true);
              if (typeof verifyProductBatchInfo === 'object' && Object.keys(verifyProductBatchInfo).length > 0) {
                  batchInfoProductError = getErrorMessage(verifyProductBatchInfo);
                  setErrorAddBatchInfo(batchInfoProductError)
              } else {
                  setErrorAddBatchInfo('');
              }
            } else {
              setErrorAddBatchInfo('');
            }



            let materialOrIngredientsProductError = '';
            if (addMaterialOrIngredients !== '') {
              const verifyMaterialOrIngredients = validateDiferentText(productMaterialOrIngredients.value, false, false);

              if (typeof verifyMaterialOrIngredients === 'object' && Object.keys(verifyMaterialOrIngredients).length > 0) {
                  materialOrIngredientsProductError = getErrorMessage(verifyMaterialOrIngredients);
                  setErrorAddMaterialOrIngredients(materialOrIngredientsProductError)
              } else {
                  setErrorAddMaterialOrIngredients('');
              }
            } else {
              setErrorAddMaterialOrIngredients('');
            }


            let safetyRatingProductError = '';
            if (addSafetyRating !== '') {
              const verifyProductSafetyRating = validateDiferentText(productSafetyRating.value, false, false);

              if (typeof verifyProductSafetyRating === 'object' && Object.keys(verifyProductSafetyRating).length > 0) {
                  safetyRatingProductError = getErrorMessage(verifyProductSafetyRating);
                  setErrorAddSafetyRating(safetyRatingProductError)
              } else {
                  setErrorAddSafetyRating('');
              }
            }
            else {
              setErrorAddSafetyRating('');
            }
  

            let shippingRestrictionsProductError = '';
            if (addShippingRestrictions !== '') {
              const verifyProductShippingRestrictions = validateDiferentText(productShippingRestrictions.value, false, false);

              if (typeof verifyProductShippingRestrictions === 'object' && Object.keys(verifyProductShippingRestrictions).length > 0) {
                  shippingRestrictionsProductError = getErrorMessage(verifyProductShippingRestrictions);
                  setErrorAddShippingRestrictions(shippingRestrictionsProductError)
              } else {
                  setErrorAddShippingRestrictions('');
              }
            } else {
              setErrorAddShippingRestrictions('');
            }

    
         
            if (!nameProductError && !priceProductError && !costProductError && !taxProductError && !discountProductError && !quantityProductError && !supplierProductError && !descriptionProductError  && !supplierSectortError && !manufacturerProductError && !weightProductError && !dimensionsProductError && !barCodeProductError  && !restockTimeProductError && !warrantyInfoProductError && !batchInfoProductError && !materialOrIngredientsProductError && !safetyRatingProductError && !shippingRestrictionsProductError) {
              const product = {
                prodName: productName.value,
                valueResale: Number(Number(productPrice.value.replace('R$', '').replace('.', '').replace(',', '.')).toFixed(1)),
                cust: Number(Number(productCust.value.replace('R$', '').replace('.', '').replace(',', '.')).toFixed(1)),
                tax: Number(Number(productTax.value.replace('%', '').replace('.', '').replace(',', '.')).toFixed(1)),
                discount: Number(Number(productDiscount.value.replace('%', '').replace('.', '').replace(',', '.')).toFixed(1)),
                qt: Number(productQuantity.value),
                supplier: productSupplier.value,
                sector: productSectorSelect.value,
                description: productDescription.value,
                datePurchase: productDatePurchase.value,
                supplierCode: productSupplierCode.value,
                manufacturer: productManufacturer.value,
                weight: Number(productWeight.value),
                weightUnit: productWeightUnit.value,
                dimensions: productDimensions.value,
                dimensionsUnit: productDimensionsUnit.value,
                barCode: productBarCode.value,
                lastUpdate: productLastUpdate.value,
                reorderPoint: Number(productReorderPoint.value),
                restockTime: Number(productRestockTime.value),
                warrantyInfo: productWarrantyInfo.value,
                batchInfo: productBatchInfo.value,
                expireDate: productExpireDate.value,
                materialOrIngredients: productMaterialOrIngredients.value,
                safetyRating: productSafetyRating.value,
                shippingRestrictions: productShippingRestrictions.value,
              };
              let response = await api.registerProduct(product.prodName, product.valueResale, product.cust, product.tax, product.supplier, product.discount, product.description, product.qt, product.datePurchase, product.sector, product.supplierCode, product.manufacturer, product.weight, product.weightUnit, product.dimensions, product.dimensionsUnit, product.barCode, product.lastUpdate, product.reorderPoint, product.restockTime, product.warrantyInfo, product.batchInfo, product.expireDate, product.materialOrIngredients, product.safetyRating, product.shippingRestrictions);
              if (response.code === 200 || response.code === 201) {
                alert('Produto cadastrado com sucesso!');
                
              } else {
                alert('Erro ao cadastrar o produto produtos.');
              }
            } else {
              alert('Erro ao cadastrar o produto produtos.');
            }
          };
  


        return (
            <>
              <section className="mt-4">
                <Container fluid>
                  <Row className="cardAddProducts">
                    <Card bg={`${isTheme ? 'dark' : 'white'}`} className="shadow">
                      <Card.Body>
                        <Card.Title className="text-center">Adicionar Produto</Card.Title>
                        <Form>
                          <Row  className="mt-3">
                            <Col lg={4}>
                              <Form.Group controlId="productName">
                                <Form.Label>Nome do Produto</Form.Label>
                                <Form.Control type="text" required maxLength={100} value={addName} onChange={handleAddName}/>
                                <p className="errorInfo">{errorAddName}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={2}>
                              <Form.Group controlId="productBarCode">
                                <Form.Label>Código de Barras</Form.Label>
                                <Form.Control type="text" maxLength={50} value={addBarCode} onChange={handleAddBarCode}/>
                                <p className="errorInfo">{errorAddBarCode}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={2}>
                              <Form.Group controlId="productResaleValue">
                                <Form.Label>Valor de venda</Form.Label>
                                <NumericFormat thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} prefix={'R$ '} required value={addResaleValue} onChange={handleAddResaleValue} customInput={CustomInput}/>
                                <p className="errorInfo">{errorAddResaleValue}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={2}>
                              <Form.Group controlId="productCust">
                                <Form.Label>Valor de compra</Form.Label>
                                <NumericFormat thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} prefix={'R$ '} required value={addCust} onChange={handleAddCust} customInput={CustomInput}/>
                                <p className="errorInfo">{errorAddCust}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={2}>
                              <Form.Group controlId="productTax">
                                <Form.Label>Imposto</Form.Label>
                                <NumericFormat suffix={'%'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} value={addTax} onChange={handleAddTax} customInput={CustomInput}/>
                                <p className="errorInfo">{errorAddTax}</p>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row  className="mt-3">
                            <Col lg={2}>
                              <Form.Group controlId="productDiscount">
                                <Form.Label>Valor de desconto</Form.Label>
                                <NumericFormat suffix={'%'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true}  value={addDiscount} onChange={handleAddDiscount} customInput={CustomInput}/>
                                <p className="errorInfo">{errorAddDiscount}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={2}>
                              <Form.Group controlId="setorSelect">
                                <Form.Label>Categoria</Form.Label>
                                {addNewSetorClicked || category.sectors.length === 0 ? (<Form.Control type="text" />) : (
                                  <Form.Select>
                                    {category.sectors.map((sector) => (
                                      <option key={sector} value={sector}>{sector}
                                      </option>
                                    ))}
                                  </Form.Select>
                                )}
                              </Form.Group>
      
                            </Col>
                              {category.sectors.length > 0 && (
                                <Col lg={1}>
                                 <Button className="addNewSetor" variant="primary" type="button" size="sm" onClick={handleAddNewSetorClick}>
                                 {addNewSetorClicked ? '-' : '+'}
                               </Button>
                             </Col>
                              )}
                            <Col lg={2}>
                              <Form.Group controlId="productSupplier">
                                <Form.Label>Fornecedor</Form.Label>
                                <Form.Control type="text" maxLength={100} value={addSupplier} onChange={handleAddSupplier} />
                                <p className="errorInfo">{errorAddSupplier}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={2}>
                              <Form.Group controlId="productSupplierCode">
                                <Form.Label>Codigo do fornecedor</Form.Label>
                                <Form.Control type="text" maxLength={50} value={addSupplierCode} onChange={handleAddSupplierCode} />
                                <p className="errorInfo">{errorAddSupplierCode}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={3}>
                              <Form.Group controlId="productManufacturer">
                                <Form.Label>Fabricante</Form.Label>
                                <Form.Control type="text" maxLength={50} value={addManufacturer} onChange={handleAddManufacturer} />
                                <p className="errorInfo">{errorAddManufacturer}</p>
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row  className="mt-3">
                            <Col lg={2}>
                              <Form.Group controlId="productQuantity">
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control  
                                  type="text"
                                  pattern="[0-9]*"
                                  inputMode="numeric"
                                  required
                                  value={addQuantity}
                                  onInput={handleAddQuantity} />
                                <p className="errorInfo">{errorAddQuantity}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={3}>
                              <Form.Group controlId="productDatePurchase">
                                <Form.Label>Data da compra</Form.Label>
                                <Form.Control type="date" required value={addDatePurchase} onChange={handleAddDatePurchase} />
                              </Form.Group>
                            </Col>
                            <Col lg={2}>
                              <Form.Group controlId="productReorderPoint">
                                <Form.Label>Ponto de reordenação</Form.Label>
                                <Form.Control
                                    type="text"
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    value={addReorderPoint}
                                    onChange={handleAddReorderPoint}
                                  />
                                <p className="errorInfo">{errorAddReorderPoint}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={2}>
                              <Form.Group controlId="productRestockTime">
                                <Form.Label>Tempo de reposição</Form.Label>
                                <Form.Control 
                                    type="text"
                                    pattern="[0-9]*"
                                    inputMode="numeric" value={addRestockTime} 
                                    onChange={handleAddRestockTime} />
                                <p className="errorInfo">{errorAddRestockTime}</p>
                              </Form.Group>
                            </Col>
                            <Col lg={3}>
                              <Form.Group controlId="productLastUpdate">
                                <Form.Label>Ultima atualização</Form.Label>
                                <Form.Control type="date" value={addLastUpdate} onChange={handleAddLastUpdate} />
                              </Form.Group>
                            </Col>
                          </Row>
                            <Row  className="mt-3">
                                <Col lg={6}>
                                    <Form.Group controlId="productWarrantyInfo">
                                        <Form.Label>Informações de garantia</Form.Label>
                                        <Form.Control type="text" value={addWarrantyInfo} onChange={handleAddWarrantyInfo} />
                                        <p className="errorInfo">{errorAddWarrantyInfo}</p>
                                    </Form.Group>
                                </Col>
                                <Col lg={3}>
                                    <Form.Group controlId="productBatchInfo">
                                        <Form.Label>Informações de lote</Form.Label>
                                        <Form.Control type="text" value={addBatchInfo} onChange={handleAddBatchInfo} />
                                        <p className="errorInfo">{errorAddBatchInfo}</p>
                                    </Form.Group>
                                </Col>
                                <Col lg={3}>
                                    <Form.Group controlId="productExpireDate">
                                        <Form.Label>Data de validade</Form.Label>
                                        <Form.Control type="date" value={addExpireDate} onChange={handleAddExpireDate} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row  className="mt-3">
                                <Col lg={3}>
                                    <Form.Group controlId="productWeight">
                                        <Form.Label>Peso</Form.Label>
                                        <Form.Control
                                              type="text"
                                              value={addWeight}
                                              onChange={handleAddWeight}
                                            />
                                        <p className="errorInfo">{errorAddWeight}</p>
                                    </Form.Group>
                                </Col>
                                <Col lg={3}>
                                    <Form.Group controlId="productWeightUnit">
                                        <Form.Label>Unidade de peso</Form.Label>
                                        <Form.Control as="select" value={addWeightUnit} onChange={handleAddWeightUnit}>
                                            <option>Selecione</option>
                                            <option>g</option>
                                            <option>kg</option>
                                            <option>mg</option>
                                            <option>lb</option>
                                            <option>oz</option>
                                        </Form.Control>
                                        <p className="errorInfo">{errorAddWeightUnit}</p>
                                    </Form.Group>
                                </Col>
                                <Col lg={3}>
                                    <Form.Group controlId="productDimensions">
                                        <Form.Label>Dimensões</Form.Label>
                                        <Form.Control type="text" value={addDimensions} onChange={handleAddDimensions} />
                                        <p className="errorInfo">{errorAddDimensions}</p>
                                    </Form.Group>
                                </Col>
                                <Col lg={3}>
                                    <Form.Group controlId="productDimensionsUnit">
                                        <Form.Label>Unidade de dimensões</Form.Label>
                                        <Form.Control as="select" value={addDimeniosnUnit} onChange={handleAddDimenionsUnit}>
                                            <option>Selecione</option>
                                            <option>cm</option>
                                            <option>m</option>
                                            <option>mm</option>
                                            <option>in</option>
                                            <option>ft</option>
                                        </Form.Control>
                                        <p className="errorInfo">{errorAddDimenionsUnit}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row  className="mt-3">
                                <Col lg={3}>
                                    <Form.Group controlId="productMaterialOrIngredients">
                                        <Form.Label>Material/Ingrediente</Form.Label>
                                        <Form.Control type="text" value={addMaterialOrIngredients} onChange={handleAddMaterialOrIngredients} />
                                        <p className="errorInfo">{errorAddMaterialOrIngredients}</p>
                                    </Form.Group>
                                </Col>
                                <Col lg={3}>
                                    <Form.Group controlId="productSafetyRating">
                                        <Form.Label>Classificaçao de segurança</Form.Label>
                                        <Form.Control type="text" value={addSafetyRating} onChange={handleAddSafetyRating} />
                                        <p className="errorInfo">{errorAddSafetyRating}</p>
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group controlId="productShippingRestrictions">
                                        <Form.Label>Restrições de envio</Form.Label>
                                        <Form.Control type="text" value={addShippingRestrictions} onChange={handleAddShippingRestrictions} />
                                        <p className="errorInfo">{errorAddShippingRestrictions}</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Form.Group controlId="productDescription">
                                    <Form.Label>Descrição do produto</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={addDescription} onChange={handleAddDescription} />
                                    <p className="errorInfo">{errorAddDescription}</p>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Button variant="primary" onClick={handleSave}>
                                        Adicionar
                                    </Button>
                                </Col>
                            </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </section>
    </>
    )
}

export default AdcProdutos;