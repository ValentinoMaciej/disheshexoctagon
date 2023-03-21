import React, { useState, useCallback } from "react";
import styles from "./App.module.css";
import { DishForm } from "./components/DishForm/DishForm";
import Modal from "./components/Modal/Modal";

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const submit = useCallback(
    (values) => {
      openModal();
      console.log(values);
    },
    [openModal]
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Dish Maker</h2>
      <DishForm onSubmit={submit} />
      <Modal show={isModalVisible} onClose={closeModal}>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default App;
