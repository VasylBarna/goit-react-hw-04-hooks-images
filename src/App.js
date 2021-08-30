import { useState } from 'react';
import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

export default function App() {
  const [imageName, setImageName] = useState('');

  const handleFormSubmit = imageName => {
    setImageName(imageName);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imageName={imageName} />
    </Container>
  );
}
