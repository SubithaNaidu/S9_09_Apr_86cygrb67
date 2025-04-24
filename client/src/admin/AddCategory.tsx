import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  TextField,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

interface AddCategoryProps {
  addCategory: boolean;
  setAddCategory: (value: boolean) => void;
}

const AddCategory = ({ addCategory, setAddCategory }: AddCategoryProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setErrorMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/categories/add", {
        name,
        description,
      });

      if (res.status === 200 || res.status === 201) {
        setAddCategory(false);
        setName("");
        setDescription("");
        setShowSuccess(true);
      }
    } catch (error: any) {
      setErrorMessage("Name already exists or invalid input.");
      setShowError(true);
    }
  };

  return (
    <>
      <Dialog
        open={addCategory}
        onClose={() => setAddCategory(false)}
        fullWidth
        sx={{
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#fff", // Ensure the background is white for a clean look
        }}
      >
        <DialogTitle
          sx={{
            backgroundColor: "#6a5acd", // Light Purple shade
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Add New Category
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#fafafa", // Soft light grey background for content
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField
            label="Category Name"
            fullWidth
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                padding: "10px",
              },
            }}
          />
          <TextField
            label="Category Description"
            fullWidth
            margin="dense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "8px",
                padding: "10px",
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#f4f4f4", // Light grey background for the action buttons
            padding: "10px 20px",
          }}
        >
          <Button
            onClick={() => setAddCategory(false)}
            sx={{
              color: "#6a5acd",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#e8e8e8",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#6a5acd",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#5c4bcf", // Darker purple on hover
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={() => setShowError(false)}
          variant="filled"
          sx={{
            backgroundColor: "#f44336", // Red background for errors
            color: "white",
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setShowSuccess(false)}
          variant="filled"
          sx={{
            backgroundColor: "#4caf50", // Green background for success
            color: "white",
          }}
        >
          Category added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddCategory;
