import { screen, render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Homepage from '@features/homepage/Homepage'

describe('App', () => {

  //Sample test using default app component
  test('Renders the people', () => {

    //Mock the useQuery function. We need to get the original methods and return them as well. 
    vi.mock(import("@hooks/api"), async (importOriginal) => {
      const actual = await importOriginal()
      return {
        ...actual,
        useGetRandomPeople: vi.fn().mockReturnValue({ data: { data: [{firstname: "John", lastname: "Smith"}] }, isLoading: false, isSuccess: true, error: {} })
      }
    })

    render(
    <QueryClientProvider client={new QueryClient()}>
        <Homepage />
    </QueryClientProvider>
    )
    
    expect(screen.getByText("John")).toBeInTheDocument();
  })
})