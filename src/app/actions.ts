"use server"
import { db } from "@/firebase"
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, getDoc, where } from "firebase/firestore"
import { redirect } from "next/navigation"


const getProducts = async () => {

  try {
    const collectionRef = collection(db, "products");
    // const orderedQuery = query(collectionRef, orderBy("createdAt", "desc"));
    // const productCollectionSnapshot = await getDocs(orderedQuery);
  
    const productCollectionSnapshot = await getDocs(collectionRef)

    const productsList = productCollectionSnapshot.docs.map(doc => ({
      ...doc.data(), id: doc.id
    }))

    return productsList
  } catch (error) {
    console.log(error)
  }

}

const addProduct = async (formData: FormData) => {
  const name = formData.get("name")
  const category = formData.get("category")
  const option = formData.get("option")
  const price = formData.get("price")
  const cost = formData.get("cost")
  const quantity = formData.get("quantity")
  
  // const userId = cookies().get("userId")
  // const userRef =  doc(db, 'products', userId)
  const collectionRef = collection(db, "products")

  const res = await addDoc(collectionRef, {
    name: name,
    category: category,
    option: option,
    price: price,
    cost: cost,
    quantity: quantity,
  })

  
  if(res.id){
    redirect("/products")
  }


}

const searchProduct = async (productName: string) => {
  const collectionRef = collection(db, "products");


  if(!productName){
    const productCollectionSnapshot = await getDocs(collectionRef)
    const productsList = productCollectionSnapshot.docs.map(doc => ({
      ...doc.data(), id: doc.id
    }))

    return productsList
  }
  
  const queryProductName = query(collectionRef,
      where("name", ">=", productName),
      where("name", "<=", productName + "\uf8ff")
    );;
  const productSnapShot = await getDocs(queryProductName);
  // Process the query results
  const productsList = productSnapShot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }));

  return productsList;
}

const updateProduct = async (productId: string, formData: any) => {
  const { name, category, option, price, cost, quantity } = formData

  try {
    // Reference to the specific document in the 'products' collection
    const productDocRef = doc(db, "products", productId);
    
    // Update the document with new fields 
    // Typically we use onSnapShot to get a realtime update
    // I want to update my data manually in client side
    await updateDoc(productDocRef, {
      name,
      category,
      option,
      price,
      cost,
      quantity
    });
  } catch (error) {
    console.log(error)
  }
}

const deleteProduct = async (productId: string) => {
  try {
    // Reference to the specific document in the 'products' collection
    const productDocRef = doc(db, "products", productId);
    
    // Delete the document
    await deleteDoc(productDocRef);
    
    console.log(`Product with ID ${productId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting product: ", error);
  }
} 

export {
  addProduct,
  searchProduct,
  getProducts,
  updateProduct,
  deleteProduct,
}