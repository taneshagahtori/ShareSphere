import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ResourceCardProps {
  resource: {
    id: number
    title: string
    description: string
    owner: string
  }
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-green-700">{resource.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{resource.description}</p>
        <p className="text-sm text-gray-500 mt-2">Owner: {resource.owner}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/resource/${resource.id}`} passHref>
          <Button className="w-full bg-green-600 hover:bg-green-700">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

