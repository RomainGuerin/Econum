interface ApiResponseViewerProps {
  response: any
}

export function ApiResponseViewer({ response }: ApiResponseViewerProps) {
  return (
    <pre className="bg-muted p-4 rounded-lg text-xs overflow-auto max-h-[400px] font-mono">
      {JSON.stringify(response, null, 2)}
    </pre>
  )
}
