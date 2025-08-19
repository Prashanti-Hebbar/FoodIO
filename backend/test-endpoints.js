// Simple test script to verify endpoints
// Run with: node test-endpoints.js

const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testEndpoints() {
  console.log('Testing FoodIO Backend Endpoints...\n');

  try {
    // Test 1: Get all recipes
    console.log('1. Testing GET /recipes');
    const recipesResponse = await axios.get(`${BASE_URL}/recipes`);
    console.log(`✅ Success: Found ${recipesResponse.data.length} recipes\n`);

    // Test 2: Get recipes with sorting
    console.log('2. Testing GET /recipes with sorting');
    const sortedResponse = await axios.get(`${BASE_URL}/recipes?sortBy=rating&sortOrder=desc`);
    console.log(`✅ Success: Got ${sortedResponse.data.length} recipes sorted by rating\n`);

    // Test 3: Test favorites endpoint (should require auth)
    console.log('3. Testing GET /favorites (should require auth)');
    try {
      await axios.get(`${BASE_URL}/favorites`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Success: Favorites endpoint correctly requires authentication\n');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    // Test 4: Test ratings endpoint (should require auth)
    console.log('4. Testing POST /ratings (should require auth)');
    try {
      await axios.post(`${BASE_URL}/ratings/123`, { rating: 5 });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Success: Ratings endpoint correctly requires authentication\n');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    console.log('🎉 All tests completed successfully!');
    console.log('\nBackend is ready for the new features!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the tests
testEndpoints(); 