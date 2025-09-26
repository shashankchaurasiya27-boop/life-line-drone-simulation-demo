import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataExport = () => {
  const [selectedDataTypes, setSelectedDataTypes] = useState([]);
  const [exportFormat, setExportFormat] = useState('json');
  const [dateRange, setDateRange] = useState('30d');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const dataTypes = [
    {
      id: 'emotion-data',
      name: 'Emotion Detection Data',
      description: 'Facial expression analysis, mood predictions, emotion timestamps',
      size: '2.4 MB',
      count: '15,847 records',
      icon: 'Brain'
    },
    {
      id: 'biometric-data',
      name: 'Biometric Measurements',
      description: 'Heart rate, stress levels, sleep quality assessments',
      size: '1.8 MB',
      count: '12,356 records',
      icon: 'Activity'
    },
    {
      id: 'voice-analysis',
      name: 'Voice Analysis Data',
      description: 'Voice prosody patterns, sentiment analysis, speech metrics',
      size: '3.2 MB',
      count: '8,923 records',
      icon: 'Mic'
    },
    {
      id: 'code-analysis',
      name: 'Code Emotion Analysis',
      description: 'Programming patterns, frustration detection, productivity metrics',
      size: '1.1 MB',
      count: '4,567 records',
      icon: 'Code'
    },
    {
      id: 'social-data',
      name: 'Social Interaction Data',
      description: 'Peer mood synchronization, group dynamics, social preferences',
      size: '0.8 MB',
      count: '2,134 records',
      icon: 'Users'
    },
    {
      id: 'academic-data',
      name: 'Academic Integration Data',
      description: 'Calendar events, assignment correlations, study patterns',
      size: '0.6 MB',
      count: '1,892 records',
      icon: 'GraduationCap'
    }
  ];

  const exportFormats = [
    { key: 'json', label: 'JSON', description: 'Machine-readable format for developers' },
    { key: 'csv', label: 'CSV', description: 'Spreadsheet-compatible format' },
    { key: 'xml', label: 'XML', description: 'Structured markup format' },
    { key: 'research', label: 'Research API', description: 'Academic research format with anonymization' }
  ];

  const dateRanges = [
    { key: '7d', label: 'Last 7 days' },
    { key: '30d', label: 'Last 30 days' },
    { key: '90d', label: 'Last 90 days' },
    { key: 'all', label: 'All time' },
    { key: 'custom', label: 'Custom range' }
  ];

  const recentExports = [
    {
      id: 1,
      filename: 'moodify-export-2025-08-19.json',
      dataTypes: ['emotion-data', 'biometric-data'],
      size: '4.2 MB',
      createdAt: '2025-08-19 15:30:00',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 2,
      filename: 'research-dataset-2025-08-15.csv',
      dataTypes: ['voice-analysis', 'code-analysis'],
      size: '2.8 MB',
      createdAt: '2025-08-15 09:15:00',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 3,
      filename: 'academic-correlation-2025-08-10.xml',
      dataTypes: ['academic-data', 'social-data'],
      size: '1.4 MB',
      createdAt: '2025-08-10 14:22:00',
      status: 'expired',
      downloadUrl: null
    }
  ];

  const toggleDataType = (dataTypeId) => {
    setSelectedDataTypes(prev => 
      prev?.includes(dataTypeId)
        ? prev?.filter(id => id !== dataTypeId)
        : [...prev, dataTypeId]
    );
  };

  const selectAllDataTypes = () => {
    setSelectedDataTypes(dataTypes?.map(dt => dt?.id));
  };

  const clearSelection = () => {
    setSelectedDataTypes([]);
  };

  const handleExport = async () => {
    if (selectedDataTypes?.length === 0) return;
    
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsExporting(false);
    
    // Show success message or download
    alert('Export completed! Download will begin shortly.');
  };

  const getTotalSize = () => {
    return selectedDataTypes?.reduce((total, typeId) => {
      const dataType = dataTypes?.find(dt => dt?.id === typeId);
      return total + parseFloat(dataType?.size || '0');
    }, 0)?.toFixed(1);
  };

  const getTotalRecords = () => {
    return selectedDataTypes?.reduce((total, typeId) => {
      const dataType = dataTypes?.find(dt => dt?.id === typeId);
      const count = parseInt(dataType?.count?.replace(/[^\d]/g, '') || '0');
      return total + count;
    }, 0)?.toLocaleString();
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-success',
      processing: 'text-warning',
      expired: 'text-error'
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="neomorphic p-6 rounded-xl bg-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-2">Data Export & Download</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Export your complete biometric and emotional data in various formats. All exports include full audit trails and metadata.
        </p>

        {/* Data Type Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-foreground">Select Data Types</h4>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={selectAllDataTypes}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={clearSelection}>
                Clear
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataTypes?.map((dataType) => (
              <div
                key={dataType?.id}
                onClick={() => toggleDataType(dataType?.id)}
                className={`
                  p-4 rounded-lg border cursor-pointer transition-all duration-200
                  ${selectedDataTypes?.includes(dataType?.id)
                    ? 'bg-primary/10 border-primary/30 text-primary' :'bg-background border-border hover:bg-muted'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${selectedDataTypes?.includes(dataType?.id) ? 'bg-primary/20' : 'bg-muted'}`}>
                    <Icon 
                      name={dataType?.icon} 
                      size={20} 
                      color={selectedDataTypes?.includes(dataType?.id) ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium">{dataType?.name}</h5>
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        selectedDataTypes?.includes(dataType?.id) 
                          ? 'bg-primary border-primary' :'border-muted-foreground'
                      }`}>
                        {selectedDataTypes?.includes(dataType?.id) && (
                          <Icon name="Check" size={12} color="white" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{dataType?.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{dataType?.count}</span>
                      <span className="font-medium">{dataType?.size}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Format Selection */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">Export Format</h4>
            <div className="space-y-2">
              {exportFormats?.map((format) => (
                <button
                  key={format?.key}
                  onClick={() => setExportFormat(format?.key)}
                  className={`
                    w-full p-3 rounded-lg border text-left transition-all duration-200
                    ${exportFormat === format?.key
                      ? 'bg-primary/10 border-primary/30 text-primary' :'bg-background border-border hover:bg-muted'
                    }
                  `}
                >
                  <div className="font-medium text-sm">{format?.label}</div>
                  <div className="text-xs text-muted-foreground">{format?.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range & Options */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-foreground mb-3">Date Range</h4>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e?.target?.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {dateRanges?.map((range) => (
                  <option key={range?.key} value={range?.key}>{range?.label}</option>
                ))}
              </select>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Include Metadata</span>
                <button
                  onClick={() => setIncludeMetadata(!includeMetadata)}
                  className={`
                    relative w-10 h-5 rounded-full transition-colors duration-200
                    ${includeMetadata ? 'bg-primary' : 'bg-muted-foreground'}
                  `}
                >
                  <div className={`
                    absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200
                    ${includeMetadata ? 'translate-x-5' : 'translate-x-0.5'}
                  `} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Include processing timestamps, algorithm versions, and privacy settings
              </p>
            </div>
          </div>
        </div>

        {/* Export Summary */}
        {selectedDataTypes?.length > 0 && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mb-6">
            <h4 className="font-medium text-primary mb-2">Export Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Data Types:</span>
                <div className="font-medium text-foreground">{selectedDataTypes?.length}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Total Records:</span>
                <div className="font-medium text-foreground">{getTotalRecords()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Estimated Size:</span>
                <div className="font-medium text-foreground">{getTotalSize()} MB</div>
              </div>
              <div>
                <span className="text-muted-foreground">Format:</span>
                <div className="font-medium text-foreground">{exportFormat?.toUpperCase()}</div>
              </div>
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="flex space-x-3">
          <Button
            variant="default"
            onClick={handleExport}
            disabled={selectedDataTypes?.length === 0 || isExporting}
            loading={isExporting}
            className="flex-1"
          >
            {isExporting ? 'Preparing Export...' : 'Export Selected Data'}
          </Button>
          <Button variant="outline">
            Schedule Export
          </Button>
        </div>
      </div>
      {/* Recent Exports */}
      <div className="neomorphic p-6 rounded-xl bg-card border border-border">
        <h4 className="text-lg font-medium text-foreground mb-4">Recent Exports</h4>
        <div className="space-y-3">
          {recentExports?.map((exportItem) => (
            <div key={exportItem?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name="Download" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h5 className="font-medium text-foreground">{exportItem?.filename}</h5>
                  <div className="text-xs text-muted-foreground">
                    {exportItem?.dataTypes?.length} data types • {exportItem?.size} • {exportItem?.createdAt}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  exportItem?.status === 'completed' ? 'bg-success/20 text-success' :
                  exportItem?.status === 'processing'? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                }`}>
                  {exportItem?.status}
                </span>
                
                {exportItem?.downloadUrl && exportItem?.status === 'completed' && (
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Clock" size={16} color="var(--color-warning)" />
            <div className="text-xs text-warning">
              <strong>Retention Policy:</strong> Export files are available for download for 30 days after creation. 
              After this period, files are automatically deleted for security.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExport;